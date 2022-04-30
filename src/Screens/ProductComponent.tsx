import React from 'react'
import {
  Dimensions,
   StyleSheet,
   Text, View,
} from 'react-native'
import tailwind from "tailwind-rn";

interface Props {
  product: Object;
}

const windowWidth = Dimensions.get('window').width;

const dateToHuman = (dateNew) => {
  const date = new Date(dateNew);
  const dateString =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return dateString;
  }

  interval = Math.floor(seconds / 2592000);

  if (interval >= 1) {
    return dateString;
  }

  interval = Math.floor(seconds / 86400);

  if (interval >= 1) {
    if (interval > 7) {
      return dateString;
    }
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  
  if (interval >= 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const ProductComponent: React.FC<Props> = ({ product }) => {
  const size = product?.size;
  return (    
    <View style={tailwind('mr-6 my-7')}>
      <View style={[tailwind('items-center rounded-t-lg h-24 bg-green-800'), styles.containerWidth]}>
        <Text style={[tailwind('text-white'), styles.containerMargin, {fontSize: size }]}>{product?.face}</Text>
      </View>
      <View style={tailwind('items-center w-full h-16 rounded-b-lg bg-gray-200 pb-3 pt-1')}>
        <Text style={[tailwind('text-sm text-black font-bold'), styles.containerMargin]}>${product?.price}</Text>
        <Text style={[tailwind('text-sm text-black'), styles.containerMargin]}>Size {product?.size}</Text>
        <Text style={[tailwind('text-sm text-black'), styles.containerMargin]}>{dateToHuman(product?.date)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerWidth:{ 
    width: windowWidth/2.5
  },
  containerMargin:{
    marginTop:'auto', 
    marginBottom:'auto', 
  }
})