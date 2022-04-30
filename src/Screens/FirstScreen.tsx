import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import tailwind from "tailwind-rn";
import { apiUrl } from '../Utils/Global';
import { AdsComponent } from './AdsComponent';
import { getProducts } from '../Services/ProductService';
import { ProductComponent } from './ProductComponent';
import {Picker} from '@react-native-picker/picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const WelcomeScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [products, setProducts] = useState<any[]>([]);
  const [loaderActive, setLoaderActive] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [query, setQuery] = useState('id');

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;

    return (layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom);

  };

  const onEndScrollAction = () => {
    handleOnEndScreenReached();
  }

  const handleOnEndScreenReached = async () => {
    let currentPage = pageNum + 1;
    let prodPerPage = perPage;
    if(currentPage == 10){
      prodPerPage = 15;
      setPerPage(prodPerPage)
    }

    let response = await getProducts(pageNum+1, prodPerPage, query);

    setProducts([...products, ...response]);

    if(response.length > 0){
      setPageNum(currentPage)
    } else {
      setLastPage(true)
    }

    setLoaderActive(false);

  };


  useEffect(() => {
    (async () => {
     let response = await getProducts(pageNum, perPage, query);
     setProducts(response);
     setLoaderActive(false);
    })();
  }, []);

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      style={styles.container}
      scrollEventThrottle={400}

      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !lastPage) {
          setLoaderActive(true);
          onEndScrollAction();
        }
      }}>
        <View style={tailwind('items-center px-5 pt-3 pb-5')}>
          <Text style={tailwind('text-lg text-black  font-bold py-3')}>Products Grid</Text>
          <Text style={tailwind('text-sm text-black text-justify py-3')}>{`Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.\n\nBut first, a word from our sponsors: `}</Text>
          <AdsComponent/>
        </View>
          <View style={tailwind('flex-row')}>
          <Text style={tailwind('text-lg text-black font-bold py-3 px-10 w-1/2')}>Sort By:</Text>
        <Picker
            selectedValue={query}
            onValueChange={async (itemValue, itemIndex) => {
              setLoaderActive(true);
              setQuery(itemValue);
              setProducts([]);
              let num = 1;
              let _perPage = 20;
              let response = await getProducts(num, _perPage, itemValue);
              setPageNum(num);
              setPerPage(_perPage);
              setProducts(response);
              setLoaderActive(false);

            }
            }
            mode='dropdown'
            style={styles.picker}
            itemStyle={styles.pickerLabel}
            >
            <Picker.Item label="ID" value="id" />
            <Picker.Item label="Size" value="size" />
            <Picker.Item label="Price" value="price" />
          </Picker>
        </View>


        {
          products.length > 0 &&
        <View style={styles.flexContainer}>
          {products?.map((item, index) => {
            if((index+1) % 20 == 0 && (index+1) != 1 && !loaderActive){
              return ( 
                <View key={index}>
                  <AdsComponent/>
                </View>
              )
            } else if((index+2) % 20 != 0 || (index+2) == 2)  {
              return ( 
                <View key={index}>
                <ProductComponent product={item} />
              </View>
                )
              } else {
                return ( 
                  <View style={styles.flexRowContainer} key={index}>
                  <ProductComponent product={products[index]}  />
                  <ProductComponent product={products[index+1]} />
              </View>
              )
            }
          })}
        </View>
        }

        {loaderActive && <View style={tailwind('items-center mt-10 mb-20')}><ActivityIndicator size="large" color={'green'} /><Text style={tailwind('text-base text-black text-center font-bold')}>{`   Loading... Please wait `}</Text></View>}
        
        {lastPage && <Text style={tailwind('text-base text-black text-center font-bold py-3')}>~ End of Catalogue ~ </Text>}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height:windowHeight,
  },
  flexContainer:{ 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    width: windowWidth*1.3, 
    paddingHorizontal: windowWidth/15 
  },
  pickerLabel:{ 
    marginTop: -50, 
    fontSize: 15, 
    width: windowWidth / 1.3, 
    alignSelf: 'center' 
  },
  picker: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: windowWidth / 2.5,
    backgroundColor: 'white',
    color:'black',
    fontSize: 12,
  },
  flexRowContainer:{
    flexDirection: 'row'
  }
 
});

export default WelcomeScreen
