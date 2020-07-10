import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/Card';
import { ScrollView } from 'react-native-gesture-handler';

export default function ReportDetail({ navigation }) {
  return (
    <View style={[globalStyles.container, { padding: 20}]}>
      <ScrollView>
        <Card>
          <Text style={globalStyles.titleText}>DATA DIRI:</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>NIK: { navigation.getParam('tilang_nik') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Nama: { navigation.getParam('ktp_nama') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>No Telepon: { navigation.getParam('ktp_telp') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Jenis Kelamin: { navigation.getParam('ktp_jk') == 'L'?'Laki-Laki': 'Perempuan' }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Pendidikan: { navigation.getParam('ktp_pendidikan') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Pekerjaan: { navigation.getParam('ktp_pekerjaan') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>TTL: { navigation.getParam('ktp_tempat_lahir') }, { navigation.getParam('ktp_tgl_lahir') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Alamat: { navigation.getParam('ktp_alamat') }, { navigation.getParam('ktp_rtrw') }, { navigation.getParam('ktp_kelurahan') }, { navigation.getParam('ktp_kecamatan') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Nomor SIM: { navigation.getParam('sim_no') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>SIM: { navigation.getParam('sim_kategori') }</Text>
        </Card>
        <Card>
          <Text style={globalStyles.titleText}>DATA KENDARAAN:</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>TNKB: { navigation.getParam('stnk_tnkb') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>NIK Pemilik: { navigation.getParam('stnk_nik') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Nama Pemilik: { navigation.getParam('stnk_nama') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Merk: { navigation.getParam('stnk_merk') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Tipe: { navigation.getParam('stnk_tipe') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Jenis: { navigation.getParam('stnk_jenis') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Model: { navigation.getParam('stnk_model') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Tahun: { navigation.getParam('stnk_tahun') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Isi Silinder: { navigation.getParam('stnk_silinder') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Noka: { navigation.getParam('stnk_noka') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Nosin: { navigation.getParam('stnk_nosin') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Warna: { navigation.getParam('stnk_warna') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Bahan Bakar: { navigation.getParam('stnk_bahan_bakar') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Warna TNKB: { navigation.getParam('stnk_warna_tnkb') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Tahun Registrasi: { navigation.getParam('stnk_tahun_registrasi') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>BPKB: { navigation.getParam('stnk_bpkb') }</Text>
        </Card>
        <Card>
          <Text style={globalStyles.titleText}>DATA PENINDAK:</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>NRP: { navigation.getParam('polisi_nrp') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Nama: { navigation.getParam('polisi_nama') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Pangkat: { navigation.getParam('polisi_pangkat') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Jenis Kelamin: { navigation.getParam('polisi_jk') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Jabatan: { navigation.getParam('polisi_jabatan') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Kesatuan: { navigation.getParam('polisi_kesatuan') }</Text>
        </Card>
        <Card>
          <Text style={globalStyles.titleText}>PELANGGARAN:</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Pasal: { navigation.getParam('pasal_pasal') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Jenis Pelanggaran: { navigation.getParam('pasal_jenis') }</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Denda Maksimal: { navigation.getParam('pasal_denda') }</Text>
        </Card>
        { navigation.getParam('pasal_denda') != '1'?
          <Card>
            <Text style={globalStyles.titleText}>DIWAKILKAN:</Text>
            <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Nama: { navigation.getParam('tilang_wakil_nama') }</Text>
            <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Umur: { navigation.getParam('tilang_wakil_umur') }</Text>
            <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'left'}}>Alamat: { navigation.getParam('tilang_wakil_alamat') }</Text>
          </Card>: <View/> }
        </ScrollView>
    </View>
  );
}