import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/Card';

export default class ReportScreen extends React.Component{
  constructor(){
    super();
    
  }
  state= {
    done: false
  }
  UNSAFE_componentWillMount(){
    this._getListTilang();
    this.render();
  }
  list = [];
  _getListTilang = async () => {
    try {
      let url = 'http://192.168.100.7:8000/api/list-tilang';
      let response = await fetch(url);
      let json = await response.json();
      let arr = json;
      
      console.log(arr);
      
      for (let index = 0; index < arr.length; index++) {
        this.list.push({
          key: index,
          tilang_id: arr[index].tilang_id,
          tilang_blangko: arr[index].tilang_blangko,
          tilang_nik: arr[index].tilang_nik,
          tilang_sim: arr[index].tilang_sim,
          tilang_tnkb: arr[index].tilang_tnkb,
          tilang_jalan: arr[index].tilang_jalan,
          tilang_wilayah: arr[index].tilang_wilayah,
          tilang_tgl: arr[index].tilang_tgl,
          tilang_wakil_status: arr[index].tilang_wakil_status,
          tilang_wakil_nama: arr[index].tilang_wakil_nama,
          tilang_wakil_umur: arr[index].tilang_wakil_umur,
          tilang_wakil_alamat: arr[index].tilang_wakil_alamat,

          ktp_nama: arr[index].ktp_nama,
          ktp_telp: arr[index].ktp_telp,
          ktp_jk: arr[index].ktp_jk,
          ktp_pendidikan: arr[index].ktp_pendidikan,
          ktp_pekerjaan: arr[index].ktp_pekerjaan,
          ktp_tgl_lahir: arr[index].ktp_tgl_lahir,
          ktp_tempat_lahir: arr[index].ktp_tempat_lahir,
          ktp_alamat: arr[index].ktp_alamat,
          ktp_rtrw: arr[index].ktp_rtrw,
          ktp_kelurahan: arr[index].ktp_kelurahan,
          ktp_kecamatan: arr[index].ktp_kecamatan,
          ktp_wn: arr[index].ktp_wn,

          sim_no: arr[index].sim_no,
          sim_kota: arr[index].sim_kota,
          sim_kategori: arr[index].sim_kategori,
          sim_berlaku: arr[index].sim_berlaku,

          stnk_tnkb: arr[index].stnk_tnkb,
          stnk_nik: arr[index].stnk_nik,
          stnk_nama: arr[index].stnk_nama,
          stnk_merk: arr[index].stnk_merk,
          stnk_tipe: arr[index].stnk_tipe,
          stnk_jenis: arr[index].stnk_jenis,
          stnk_model: arr[index].stnk_model,
          stnk_tahun: arr[index].stnk_tahun,
          stnk_silinder: arr[index].stnk_silinder,
          stnk_noka: arr[index].stnk_noka,
          stnk_nosin: arr[index].stnk_nosin,
          stnk_warna: arr[index].stnk_warna,
          stnk_bahan_bakar: arr[index].stnk_bahan_bakar,
          stnk_warna_tnkb: arr[index].stnk_warna_tnkb,
          stnk_tahun: arr[index].stnk_tahun_registrasi,
          stnk_bpkb: arr[index].stnk_bpkb,

          pasal_pasal: arr[index].pasal_pasal,
          pasal_jenis: arr[index].pasal_jenis,
          pasal_denda: arr[index].pasal_denda,

          polisi_nrp: arr[index].polisi_nrp,
          polisi_nama: arr[index].polisi_nama,
          polisi_pangkat: arr[index].polisi_pangkat,
          polisi_jk: arr[index].polisi_jk,
          polisi_jabatan: arr[index].polisi_jabatan,
          polisi_kesatuan: arr[index].polisi_kesatuan,
        })
      }
      this.setState({done: true})
      console.log(this.list);
      // await AsyncStorage.setItem('listPelanggaran', JSON.stringify(json));
    } catch (error) {
      console.log(error);
          
    }
  }
  render(){
    const list = this.list;
    const reportList = (<FlatList data={list} renderItem={({ item }) => (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ReportDetail', item)}>
        <Card>
          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, fontWeight: 'normal', textAlign: 'left'}}>ID: { item.tilang_id }</Text>
            <Text style={{fontSize: 12, fontWeight: 'normal', textAlign: 'right'}}>{ item.tilang_tgl }</Text>
          </View>
          <Text style={globalStyles.titleText}>Blangko: { item.tilang_blangko }</Text>
          <Text style={globalStyles.titleText}>Nama: { item.ktp_nama }</Text>
          <Text style={globalStyles.titleText}>SIM:  { item.tilang_sim }</Text>
          <Text style={globalStyles.titleText}>TNKB: { item.tilang_tnkb }</Text>
          <Text style={globalStyles.titleText}>Lokasi: { item.tilang_jalan }, { item.tilang_wilayah }</Text>
        </Card>
      </TouchableOpacity>
    )} />);
    return (
      <View style={[globalStyles.container, {marginTop: 30, padding: 20}]}>
        {this.state.done?reportList:<View style={{flex: 1}}><ActivityIndicator color={"black"} /></View>}
      </View>
    );
  }
  
}