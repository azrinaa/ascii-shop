import React, { useEffect } from 'react'
import {
  Alert,
  Image,
} from 'react-native'
import tailwind from "tailwind-rn";
import { apiUrl } from '../Utils/Global';



export const Ads = () => {

  return (    
    <Image style={tailwind('w-80 h-48 py-2')} source={{uri:`${apiUrl}ads/?r=${Math.floor(Math.random() * 1000)}`}} />
  )
}

export const AdsComponent = React.memo(Ads);
