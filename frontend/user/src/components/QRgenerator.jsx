import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = ({ jsonData }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <QRCode value={JSON.stringify(jsonData)} size={200} />
      </View>
    );
  };
  
  export default QRCodeGenerator;
  