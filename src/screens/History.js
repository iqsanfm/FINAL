import {
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function History({navigation}) {
  const [datahistory, setdatahistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jumlah, setJumlah] = useState(0);

  React.useEffect(() => {
    const fetchHistory = async () => {
      // Ambil UID dari user
      const uid = auth().currentUser.uid;

      try {
        // Ambil ID Bank Note berdasarkan UID user
        const fetchIdBankNote = await database()
          .ref(`users/${uid}`)
          .once('value');

        // Setelah ID Bank Note diambil, baca data history berdasarkan ID Bank Note tersebut
        if (fetchIdBankNote.val().IDBankNotes) {
          const IDBankNotes = fetchIdBankNote.val().IDBankNotes;
          const fetchHistoryData = await database()
            .ref(`BankNotes/${IDBankNotes}`)
            .once('value');

          let hitungJumlah = 0;
          let historyDataTemp = [];
          console.log('Fetch History: ', fetchHistoryData.val());
          for (const itemHistory in fetchHistoryData.val()) {
            // hitungJumlah += fetchHistoryData.val()[itemHistory].nominal;
            const item = fetchHistoryData.val()[itemHistory];
            item.id = itemHistory;
            const nominalNoDot = Number(item.nominal.replace(/[.]+/g, ''));
            hitungJumlah += nominalNoDot;
            historyDataTemp.push(item);
          }

          const jumlahRupiah = hitungJumlah
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
          setdatahistory(historyDataTemp);
          setJumlah(jumlahRupiah);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchHistory();
  }, []);

  console.log('Data History: ', datahistory);

  const Item = ({item}) => (
    <View style={styles.tableItem}>
      <Text style={styles.textItem}>{item.waktu}</Text>
      <Text style={styles.textItem}>Rp{item.nominal}</Text>
    </View>
  );

  return (
    <View style={styles.Container}>
      <TouchableHighlight
        style={styles.Bars}
        onPress={() => navigation.openDrawer()}>
        <FontAwesome5 name={'bars'} size={25} color="white" />
      </TouchableHighlight>
      <Text style={styles.Text1}>History</Text>
      <Text style={styles.Text2}>Tabungan</Text>
      <Text style={styles.Text3}>Please save your money!</Text>
      <View style={styles.Tabungan}>
        <View style={styles.tableHeader}>
          <Text style={styles.textHeader}>Waktu</Text>
          <Text style={styles.textHeader}>Nominal</Text>
        </View>
        {loading ? <ActivityIndicator style={{alignSelf: 'center'}} /> : null}
        <FlatList
          data={datahistory}
          renderItem={Item}
          keyExtractor={item => item.id}
          refreshing={loading}
        />
        <View style={styles.tableHeader}>
          <Text style={styles.textHeader}>Total</Text>
          <Text style={styles.textHeader}>Rp{jumlah}</Text>
        </View>
      </View>
      <View style={styles.Total}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#040D12',
  },
  Bars: {
    height: 35,
    width: 35,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: '#1d2b3a',
    paddingLeft: 7,
    paddingTop: 4,
    borderRadius: 10,
  },
  shadow: {
    width: 320,
    height: 50,
    width: '90%',
    height: '10%',
    borderRadius: 100,
    marginTop: -30,
    paddingTop: 10,
    marginLeft: 22,
    shadowColor: '#000000',
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 1,
    elevation: 15,
  },
  Text1: {
    marginTop: 30,
    fontFamily: 'monospace',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  Text2: {
    fontFamily: 'monospace',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  Text3: {
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    color: '#A2FF86',
    textAlign: 'center',
  },

  Tabungan: {
    height: 400,
    width: 300,
    marginTop: 30,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  Back: {
    height: 40,
    width: 80,
    marginTop: 45,
    marginLeft: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  tableHeader: {
    height: 40,
    width: 300,
    paddingHorizontal: 10,
    backgroundColor: '#A2FF86',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  tableItem: {
    height: 30,
    width: 300,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textItem: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
});
