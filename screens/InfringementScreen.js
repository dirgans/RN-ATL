import * as React from 'react';
import { Picker, ScrollView, View, ActivityIndicator, TextInput, Text, StyleSheet, TouchableHighlight, AsyncStorage, ImageBackground, Image, Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';
import * as ImagePicker from 'expo-image-picker';
import Select2 from "react-native-select-two";
import Constants from 'expo-constants';
import { Checkbox } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from "@expo/vector-icons";
import Card from '../shared/Card';
import {globalStyles} from '../styles/global'
import { date } from 'yup';


export class DataPelanggar extends React.Component {

  state = {
    image: null,
    isLoading: false,
    noKTP: '',
    STNK: '',
    SIM: 'A',
    flag: false,
    validation: false
  };

  UNSAFE_componentWillMount(){
    this.findCoordinates();
    this.select2();  
  };

  select2 = async () => {
      try {
          let url = 'http://192.168.1.17:8000/api/list-pelanggaran';
          let response = await fetch(url);
          let json = await response.json();
          await AsyncStorage.setItem('listPelanggaran', JSON.stringify(json));
      } catch (error) {
        console.log(error);
            
      }
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = [position.coords.latitude, position.coords.longitude];
        AsyncStorage.setItem('currLoc', JSON.stringify(location));
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   );
  };

  submitDataPelanggar = async () => {
    if ( this.state.noKTP.length == 16 || this.state.noKTP.length == 12) {
      this.state.validation = false;
      return fetch('http://192.168.1.17:8000/api/data-pelanggar',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              nik: this.state.noKTP,
              tnkb: this.state.STNK,
              sim: this.state.SIM,
              flag: this.state.flag
          }), 
      }).then(response => response.json())
      .then(responseJson=>{
        console.log(responseJson.merek);
        AsyncStorage.setItem('dataPelanggar', JSON.stringify(responseJson));
        this.props.navigation.navigate('Detail');
      }).catch(error=>{
        console.log(error);
    })} else {
      console.log('asd');
      this.state.validation = true;
    
    }
    
    
  }

  // Handle onChange
  _handleChangeNIK = ({ nativeEvent: { text } }) => {
    this.setState({ noKTP: text.toUpperCase() });
    console.log(this.state.noKTP);
  };

  _handleChangeSTNK = ({ nativeEvent: { text } }) => {
    this.setState({ STNK: text.toUpperCase() });
    console.log(this.state.STNK);
  };

  render() {
    let { STNK, noKTP } = this.state;

    return (
      <ImageBackground source={require('../assets/bg-login-2.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    // justifyContent: "center",
                    // alignItems: "center",
                }}
                resizeMode='cover'
                >
      <View style={styles.container}>
        <Image source = {require('../assets/icon.png')} style = {{ width: 150, height: 150}}></Image>
        {/* <Card> */}
        <Text style={{fontSize: 12, color: 'black', width: '85%', textAlign: 'left'}}>TNKB / No. Mesin</Text>
        <TextInput
          style={styles.textBox}
          placeholder='Masukan TNKB atau No. Mesin...'
          onChange={this._handleChangeSTNK}
          value={STNK}
          keyboardType='default'
          autoCapitalize= 'none'
           />
        <Text style={{fontSize: 12, color: 'black', width: '85%', textAlign: 'left', marginTop: 10}}>NIK / No. SIM</Text>
        <TextInput
          style={styles.textBox}
          placeholder='Masukan NIK atau No. SIM...'
          onChange={this._handleChangeNIK}
          value={noKTP}
          keyboardType='number-pad'
          autoCapitalize= 'none'
           />
          {this.state.validation && <Text style={{fontSize: 12, color: 'red'}}>Masukan 16 digit untuk NIK atau 12 digit untuk No. SIM</Text>}
        <Text style={{fontSize: 12, color: 'black', width: '85%', textAlign: 'left', marginTop: 10}}>Kategori</Text>
        <Picker
          style={styles.picker} itemStyle={styles.pickerItem}
          selectedValue={this.state.SIM}
          onValueChange={(itemValue) => this.setState({SIM: itemValue})}
        >
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B I" value="B I" />
          <Picker.Item label="B II" value="B II" />
          <Picker.Item label="C" value="C" />
          <Picker.Item label="D" value="D" />
        </Picker>
        {this.state.isLoading && <ActivityIndicator color={"#fff"} />}
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight style={[styles.button, {backgroundColor: 'black'}]} onPress={this.nikRecognition}>
            <FontAwesome5 name="camera" size={25} color="white" />
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, {backgroundColor: 'black'}]} onPress={this.submitDataPelanggar}>
            <FontAwesome5 name="check" size={25} color="white" />
          </TouchableHighlight>
        </View>
        {/* </Card> */}
      </View>
      </ImageBackground>
    );
  }


  // OCR
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  nikRecognition = async () => {
    // PICK IMAGE DARI GALERI
    // try {
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //   });
    //   if (!result.cancelled) {
    //     this.setState({ image: result.uri });
    //   }

    //   console.log(result);
    // } catch (E) {
    //   console.log(E);
    // }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.cancelled) {

      this.setState({ isLoading: true });
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
    
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      formData.append('photo', { uri: result.uri, name: filename, type: type });

      return fetch("http://192.168.1.17:5000/", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'content-type': 'multipart/form-data',
        },
      }).then(response => response.json())
        .then(responseJson =>{
          console.log(responseJson);
          if (!responseJson) {
            Alert.alert(
              'Oops!',
              'Segmentasi Gagal!',
              [
                {text: 'Close'},
              ],
              {cancelable: false},
            );
          } else {
            this.setState({noKTP: responseJson})
            this.setState({ isLoading: false });  
          }
        })
    }
  };
}

export class DetailPelanggaran extends React.Component {
  state = {
    value: {},
    SIM: false,
    STCKB: false,
    STNK: false,
    Ranmor: false,
    listPelanggaran: {},
    chkdPelanggaran: 0
  }
  UNSAFE_componentWillMount(){
    this._getDataPelanggar();
    this._listPelanggaran();
  }

  _getDataPelanggar = async () => {
    var res = await AsyncStorage.getItem('dataPelanggar');
    this.setState({ value: JSON.parse(res) });
  }

  mockData = [];
  _listPelanggaran = async () => {
    var val = await AsyncStorage.getItem('listPelanggaran');
    this.setState({ listPelanggaran: JSON.parse(val) });
    // console.log(this.state.listPelanggaran);
    var lp = this.state.listPelanggaran;
    console.log(lp);
    
    for (let i = 0; i < lp.length; i++) {
      this.mockData.push({
        id: lp[i].id, 
        name: lp[i].pelanggaran,
        checked: false,
        pasal: lp[i].pasal,
        denda: lp[i].denda_max
      });      
    }
  }

  getAddress = (coor) => {
    Geocoder.init('AIzaSyBSBl1InT_Gu1onPYFZAoq0qLYNVgJlGTI');
    Geocoder.from(coor).then(json=>{
      return console.log(json);
    });
  }

  submitDetailPelanggaran = async () => {
    var pol = await AsyncStorage.getItem('userToken');
    var petugas = JSON.parse(pol);
    var coor = await AsyncStorage.getItem('currLoc');
    // var lokasi = this.getAddress(coor);
    var pelanggar = this.state.value;
    var chkplg = this.state.chkdPelanggaran;
    var pelanggaran = {id: this.mockData[chkplg].id, name: this.mockData[chkplg].name, pasal: this.mockData[chkplg].pasal, denda: this.mockData[chkplg].denda};

    var sitaan = [
      {key: 'SIM', val: this.state.SIM},
      {key: 'STCKB', val: this.state.STCKB},
      {key: 'STNK', val: this.state.STNK},
      {key: 'Ranmor', val: this.state.Ranmor},
    ];
    var res = [];
    for (let i = 0; i < sitaan.length; i++) {
      if (sitaan[i].val) {
        res.push(sitaan[i].key);
      }
    }
    

    var tilang = {
      polisi: {
        pls_nrp: petugas.nrp,
        pls_nama: petugas.nama,
        pls_pangkat: petugas.pangkat,
        pls_kesatuan: petugas.kesatuan
      },
      pelanggar: {
        plg_nama: pelanggar.nama,
        plg_alamat: pelanggar.alamat,
        plg_pekerjaan: pelanggar.pekerjaan,
        plg_pendidikan: pelanggar.pendidikan,
        plg_umur: pelanggar.umur,
        plg_TTL: pelanggar.tempat + ', ' + pelanggar.tanggal_lahir,
        plg_nik: pelanggar.nik,
        plg_nomor_sim: pelanggar.nomor_sim,
        plg_kategori: pelanggar.kategori
      },
      kendaraan: {
        kb_tnkb: pelanggar.tnkb,
        kb_jenis: pelanggar.jenis,
        kb_merek: pelanggar.merek,
        kb_nomor_rangka: pelanggar.nomor_rangka,
        kb_nomor_mesin: pelanggar.nomor_mesin
      },
      pelanggaran: {
        id: pelanggaran.id,
        name: pelanggaran.name,
        pasal: pelanggaran.pasal,
        denda: pelanggaran.denda,
        sitaan: res.join(', ')
      }
    };
    await AsyncStorage.setItem('formTilang', JSON.stringify(tilang));
    this.props.navigation.navigate('printTilang');
  }

  render() {
    const {SIM, STCKB,STNK,Ranmor} = this.state;

    const checkSelect = (data) => {
      for (let index = 0; index < this.mockData.length; index++) {
        const val = this.mockData[index];
        if (val.id == data[0]) {
          val.checked = true;
          this.setState({chkdPelanggaran: index});  
        }else{
          val.checked = false;
        }
      }
      // console.log(val);
      
    }

    // data pelanggar
    var detail_pelanggar = [
      {key: 'NIK', value: this.state.value.nik},
      {key: 'Nama', value: this.state.value.nama},
      {key: 'Alamat', value: this.state.value.alamat},
      {key: 'Pekerjaan', value: this.state.value.pekerjaan},
      {key: 'Pendidikan', value: this.state.value.pendidikan},
      {key: 'Umur', value: this.state.value.umur},
      {key: 'TTL', value: this.state.value.tempat+', '+this.state.value.tanggal_lahir},
      {key: 'No. SIM', value: this.state.value.nomor_sim},
      {key: 'SIM', value: this.state.value.kategori},
      {key: 'Kota Dikeluarkan', value: this.state.value.kota_dikeluarkan},
      {key: 'Berlaku', value: this.state.value.berlaku_sampai}
    ];

    var detail_kendaraan = [
      {key: 'TNKB', value: this.state.value.tnkb},
      {key: 'Pemilik', value: this.state.value.pemilik},
      {key: 'Jenis', value: this.state.value.jenis},
      {key: 'Merek', value: this.state.value.merek},
      {key: 'Tahun', value: this.state.value.tahun},
      {key: 'Tipe', value: this.state.value.tipe},
      {key: 'Isi Silinder', value: this.state.value.isi_silinder},
      {key: 'No. Rangka', value: this.state.value.nomor_rangka},
      {key: 'No. Mesin', value: this.state.value.nomor_mesin},
      {key: 'Warna', value: this.state.value.warna},
      {key: 'Bahan Bakar', value: this.state.value.bahan_bakar},
      {key: 'Tahun Registrasi', value: this.state.value.tahun_registrasi},
      {key: 'Berlaku Sampai', value: this.state.value.berlaku_sampai_stnk}
    ];

    var return_dp = [], return_dk= [];

    for(let i = 0; i < detail_pelanggar.length; i++){
      return_dp.push(
        <View style={{flexDirection: 'row'}} key={i}>
          <View style={{width: '35%', alignItems: 'flex-start'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                {detail_pelanggar[i].key}
            </Text>
          </View>
          <View style={{width: '5%', alignItems: 'flex-start'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                :
            </Text>
          </View>
          <View style={{width: '60%', alignItems: 'flex-start'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
              {detail_pelanggar[i].value}
            </Text>
          </View>
        </View>
      )
    }

    for(let i = 0; i < detail_kendaraan.length; i++){
      return_dk.push(
        <View style={{flexDirection: 'row'}} key={i}>
          <View style={{width: '35%', alignItems: 'flex-start'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                {detail_kendaraan[i].key}
            </Text>
          </View>
          <View style={{width: '5%', alignItems: 'flex-start'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                :
            </Text>
          </View>
          <View style={{width: '60%', alignItems: 'flex-start'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
              {detail_kendaraan[i].value}
            </Text>
          </View>
        </View>
      )
    }
    // end

    return (
      <ImageBackground source={require('../assets/bg-login-2.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    // justifyContent: "center",
                    // alignItems: "center",
                }}
                resizeMode='cover'
                >
      <View style={{
                  flex: 1,
                  flexDirection: 'column',
              }}>
        <View style={{
            flex: 1,
            // backgroundColor: '#4734ac',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
          <ScrollView style={{}}>
            {/* detail start */}
            <ScrollView style={{flex:1,}} horizontal>
            
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 450,
                height: '100%',
                marginBottom: 10,
                // marginRight: 10,backgroundColor: 'rgba(52, 52, 52, 0.8)'
                // backgroundColor: 'skyblue'
              }}>
                <Card>
                <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold', margin: 10}}>DATA PELANGGAR</Text>
                {return_dp}
                </Card>
              </View>
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 400,
                height: '100%',
                marginBottom: 10,
                marginRight: 10,
                // backgroundColor: 'skyblue'
              }}>
                <Card>
                <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold', margin: 10}}>DATA KENDARAAN</Text>
                {return_dk}
                </Card>
              </View>
            
            </ScrollView> 
            {/* detail end */}

            {/* pasal start */}
            <View style={{padding: 20, paddingTop: 5, width: '100%', backgroundColor: 'rgb(168, 243, 253)', borderRadius: 20, paddingHorizontal: 30}}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Pelanggaran:</Text>
              <Select2
                searchPlaceHolderText='Cari pelanggaran...'
                isSelectSingle
                selectButtonText='Pilih'
                cancelButtonText='Batal'
                listEmptyTitle='Data tidak ditemukan'
                style={{ borderRadius: 5}}
                colorTheme="blue"
                selectedTitleStyle={{color: 'black'}}
                popupTitle="Pilih Pelanggaran"
                title="Pilih pelanggaran..."
                data={this.mockData}
                onSelect={data => {
                  checkSelect(data);
                }}
                onRemoveItem={data => {
                  // this.setState({ data })
                }}
              />
            </View>
            {/* pasal end */}

            {/* sitaan start */}
            <View style={{padding: 20, marginTop: 5, width: '100%', backgroundColor: 'rgb(187, 181, 247)', borderRadius: 20, paddingHorizontal: 30}}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>Disita / Dititipkan:</Text>
              <View style={{ flexDirection: 'row', paddingTop: 5, }}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <Checkbox
                    color='black'
                    status={SIM ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ SIM: !SIM }); }}
                  />
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>
                    SIM
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Checkbox
                    color='black'
                    status={STNK ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({STNK: !STNK }); }}
                  />
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>
                    STNK
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Checkbox
                    color='black'
                    status={STCKB ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ STCKB: !STCKB }); }}
                  />
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>
                    STCKB
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Checkbox
                    color='black'
                    status={Ranmor ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ Ranmor: !Ranmor }); }}
                  />
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>
                    Ranmor
                  </Text>
                </View>
              </View>
            </View>
            {/* sitaan end */}

          </ScrollView>
          
          <View style={{flexDirection: 'row'}}>
          {this.state.isLoading && <ActivityIndicator color={"#fff"} />}
            <TouchableHighlight style={[styles.button, {backgroundColor: 'black'}]} onPress={()=>this.props.navigation.navigate('FormOCR')}>
              <FontAwesome5 name="angle-left" size={25} color="white" />
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: 'black'}]} onPress={this.submitDetailPelanggaran}>
              <FontAwesome5 name="check" size={25} color="white" />
            </TouchableHighlight>
          </View>
              
        </View>
      </View>
      </ImageBackground>
    );
  }
}

export class PrintTilang extends React.Component {
  state = {
    data: {
      kendaraan: {},
      pelanggar: {},
      pelanggaran: {},
      polisi: {},
    },
    sendiri: false,
    diwakilkan: false,
    wakilNama: '',
    wakilUmur: '',
    wakilAlamat: ''
  }
  UNSAFE_componentWillMount(){
    this._loadData();
  }

  _loadData = async () => {
    var val = await AsyncStorage.getItem('formTilang');
    
    this.setState({data: JSON.parse(val)}); 
  }

  _handleChangeNama = ({ nativeEvent: { text } }) => {
    this.setState({ wakilNama: text.toUpperCase() });
  };

  _handleChangeUmur = ({ nativeEvent: { text } }) => {
    this.setState({ wakilUmur: text.toUpperCase() });
  };

  _handleChangeAlamat = ({ nativeEvent: { text } }) => {
    this.setState({ wakilAlamat: text.toUpperCase() });
  };

  submitForm = () => {
    const detail = this.state.data;
    const {wakilAlamat, wakilNama, wakilUmur, sendiri, diwakilkan} = this.state;
    const output = {
      detail: detail,
      wakil: {
        alamat: wakilAlamat,
        nama: wakilNama,
        umur: wakilUmur,
        sendiri: sendiri,
        diwakilkan: diwakilkan
      }
    }
    fetch('http://192.168.1.17:8000/api/data-tilang',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: output,
        flag: true
      })
    }).then(response => response.json())
      .then(responseJson=>{
        var response = responseJson;
        console.log(responseJson);
        AsyncStorage.setItem('flash', JSON.stringify({code: 2,status: 'Berhasil', message: 'Data Tilang berhasil Dibuat!', type: 'success'}));
        this.props.navigation.navigate('Dashboard');
      }).catch(error=>{
        console.log(error);
    })
    
  }
  render(){
    const { sendiri, diwakilkan, wakilNama, wakilUmur, wakilAlamat} = this.state;

    const value = this.state.data;

    const wakilTerdakwa = 
      <View >
        <Text style={{fontSize: 12, color: 'black', width: '85%', textAlign: 'left'}}>Nama</Text>
        <TextInput
          style={styles.textBox}
          placeholder='Masukan nama wakil...'
          onChange={this._handleChangeNama}
          value={wakilNama}
          keyboardType='default'
          autoCapitalize= 'none'
            />
        <Text style={{fontSize: 12, color: 'black', width: '85%', textAlign: 'left', marginTop: 10}}>Umur</Text>
        <TextInput
          style={styles.textBox}
          placeholder='Masukan umur wakil...'
          onChange={this._handleChangeUmur}
          value={wakilUmur}
          keyboardType='number-pad'
          autoCapitalize= 'none'
            />
        <Text style={{fontSize: 12, color: 'black', width: '85%', textAlign: 'left', marginTop: 10}}>Alamat</Text>
        <TextInput
          style={styles.textBox}
          placeholder='Masukan alamat wakil...'
          onChange={this._handleChangeAlamat}
          value={wakilAlamat}
          keyboardType='default'
          autoCapitalize= 'none'
            />
      </View>

    // date time
    var d = new Date();
    var day = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

    var dateTime = [day[d.getDay()], d.getDate(), d.getMonth(), d.getFullYear(), d.getHours(), d.getMinutes()];


    console.log(value);
    
    return (
      <ImageBackground source={require('../assets/bg-login-2.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    // justifyContent: "center",
                    // alignItems: "center",
                }}
                resizeMode='cover'
                >
        <ScrollView>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>  
            {/* <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold', margin: 10}}>{value.polisi.pls_kesatuan}</Text> */}
            {/* header */}
            <Card>
            <View style={{width: '100%'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 20,  }}>
                    Kesatuan
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 20,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 20,  }}>
                    {value.polisi.pls_kesatuan}
                  </Text>
                </View>
              </View>
            </View>
            </Card>
            {/* header end */}
            <Card>
            <View style={{width: '100%', borderBottomWidth: 2}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Nama
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_nama}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Alamat
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_alamat}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Pekerjaan
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_pekerjaan}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Pendidikan
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_pendidikan}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Umur
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_umur}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    TTL
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_TTL}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    No. KTP
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_nik}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{width: '100%', borderBottomWidth: 2}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    SIM GOL
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_kategori}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    No. SIM
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.pelanggar.plg_nomor_sim}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    SATPAS
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {/* {value.pelanggar.plg_nomor_sim} */}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Tanggal
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {/* {value.pelanggar.plg_nomor_sim} */}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{width: '100%', borderBottomWidth: 2}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    TNKB
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.kendaraan.kb_tnkb}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Jenis
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.kendaraan.kb_jenis}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    Merek
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.kendaraan.kb_merek}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    NOKA
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.kendaraan.kb_nomor_rangka}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '35%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    NOSIN
                  </Text>
                </View>
                <View style={{width: '5%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                      :
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 16,  }}>
                    {value.kendaraan.kb_nomor_mesin}
                  </Text>
                </View>
              </View>
            </View>
            </Card>
            <Card>
            <View style={{width: '100%',  borderBottomWidth: 2, paddingHorizontal: 5}}>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                PADA HARI INI <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{dateTime[0]}</Text> TANGGAL <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{dateTime[1]}</Text> BULAN <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{dateTime[2] + 1} {dateTime[3]}</Text> JAM <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{dateTime[4]}</Text>
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                DIJALAN ... DEKAT ... DALAM WILAYAH ...
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                BERDASARKAN PASAL 16 SUB a DAN e UU NO. 2/2002 DAN PASAL 38 AYAT (2) UU NO. 8/1981 SERTA PASAL 52 UU NO. 14/1992 TELAH DISITA/DITITIPKAN: <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{value.pelanggaran.sitaan}</Text>
              </Text>
            </View>

            <View style={{width: '100%',  borderBottomWidth: 2, paddingHorizontal: 5}}>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                SELANJUTNYA PENYIDIK ATAS KUASA PENUNTUT UMUM DEMI HUKUM MEWAJIBKAN TERDAKWA MENGHADIRI SIDANG PENGADILAN NEGERI: <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>DEPOK</Text>
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                PADA HARI <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>JUMAT</Text> TANGGAL <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>23-7-2020</Text> JAM <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>08:00</Text>
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                NAMA : <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{value.polisi.pls_nama}</Text>
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                NRP : <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{value.polisi.pls_nrp}</Text>
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                KESATUAN : <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{value.polisi.pls_kesatuan}</Text>
              </Text>
            </View>
            </Card>
            <Card>
            <View style={{width: '100%',  borderBottomWidth: 2, paddingHorizontal: 5}}>
              <Text style={{color: 'black',  fontWeight: 'bold', fontSize: 18,  }}>
                RUANG BAGI TERDAKWA
              </Text>
              <Text style={{color: 'black',  fontSize: 12,  }}>
                MELANGGAR PASAL : <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{value.pelanggaran.pasal}</Text>
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
      JUMLAH DENDA MAKSIMAL : <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{value.pelanggaran.denda}</Text>
              </Text>
              <Text style={{color: 'black',   fontSize: 12,  }}>
                DISETORKAN MELALUI BANK : <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>BRI</Text>
              </Text>
            </View>

            <View style={{width: '100%',  borderBottomWidth: 2, paddingHorizontal: 5}}>
              <Text style={{color: 'black',  fontSize: 18,  }}>
                PERNYATAAN TERDAKWA
              </Text>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 12,  }}>
                Dengan ini saya menyatakan:
              </Text>
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Checkbox
                  color="black"
                  status={sendiri ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({ diwakilkan: sendiri }); this.setState({ sendiri: !sendiri }); }}
                />
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>
                  Saya akan hadir sendiri di sidang Pengadilan perkara pelanggaran tersebut.
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Checkbox
                  color="black"
                  status={diwakilkan ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({sendiri: diwakilkan }); this.setState({diwakilkan: !diwakilkan }); }}
                />
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16,  marginTop: 5 }}>
                  Berdasarkan Pasal 213 UU NO. 8 Tahun 1981 Tentang Hukum Acara Pidana, saya menunjuk seorang untuk mewakili disidang yaitu:
                </Text>
              </View>
              {diwakilkan?wakilTerdakwa:<View/>}
            </View>
            </Card>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight style={[styles.button, {backgroundColor: 'black'}]} onPress={()=>this.props.navigation.navigate('Detail')}>
                <FontAwesome5 name="angle-left" size={25} color="white" />
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button, {backgroundColor: 'black'}]} onPress={this.submitForm}>
                <FontAwesome5 name="check" size={25} color="white" />
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10, 
    width: '40%', 
    height: 45,
    backgroundColor: 'darkviolet',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6
  },
  container: {
    // backgroundColor: '#173f5f',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBox: {
    width: '85%', 
    height: 45,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 2,
    borderColor: 'grey',
    color: 'black',
    borderRadius: 6,
    fontSize: 18,
  },
  picker: {
    width: '85%', 
    height: 45,
    backgroundColor: 'grey',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'grey',
    color: 'black',
    borderRadius: 6,
    fontSize: 18,
  },
  pickerItem: {
    color: 'black'
  },
})