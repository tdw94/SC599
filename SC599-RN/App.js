import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [showCam, setShowCam] = useState(false);
  const [showL, setShowL] = useState(false)
  const devices = useCameraDevices();
  const device = devices.front;
  const initTime = useRef(null);
  const loadedTime = useRef(null);
  const [tt, setTt] = useState(null);
  const [ctt, setCtt] = useState(null);
  const camera = useRef(null);
  const [lTime, setLTime] = useState(null)
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    initTime.current = Date.now();
    getPermCam();
    getPermGeo();
  }, []);

  const getPermCam = async () => {
    const permCam = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
    const permAud = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
    if (permCam === PermissionsAndroid.RESULTS.GRANTED && permAud === PermissionsAndroid.RESULTS.GRANTED) {
      setShowCam(true)
    } else {
      const permCamNew = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      const permAudNew = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
      if (permCamNew === PermissionsAndroid.RESULTS.GRANTED && permAudNew === PermissionsAndroid.RESULTS.GRANTED) {
        setShowCam(true)
      }
    }
  };

  const getPermGeo = async () => {
    const fineLo = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    const coarseLo = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
    if (fineLo === PermissionsAndroid.RESULTS.GRANTED && coarseLo === PermissionsAndroid.RESULTS.GRANTED) {
      setShowL(true)
    } else {
      const fineLoR = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      const coarseLoR = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
      if (fineLoR === PermissionsAndroid.RESULTS.GRANTED && coarseLoR === PermissionsAndroid.RESULTS.GRANTED) {
        setShowL(true)
      }
    }
  }

  const onCamLoad = () => {
    loadedTime.current = Date.now();
    setTt(loadedTime.current - initTime.current);
  };

  const captureImage = async () => {
    const startCaptureT = Date.now();
    await camera.current.takePhoto();
    setCtt(Date.now() - startCaptureT);
  };

  const getCurLocation = () => {
    const startLT = Date.now();
    Geolocation.getCurrentPosition(
      (position) => {
        setLTime(Date.now() - startLT)
        setCoords(position)
      },
      () => {
        // See error code charts below.
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10 }
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ScrollView
        // contentInsetAdjustmentBehavior="automatic"
        style={{
          // flex: 1,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          SC599 Test
        </Text>
        <Text
          style={{
            color: 'black',
          }}>
          Time to load: {tt}ms
        </Text>
        <Text
          style={{
            color: 'black',
          }}>
          Time to capture: {ctt}ms
        </Text>
        {showCam && device ? (
          <Camera
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').width,
            }}
            device={device}
            isActive={true}
            onInitialized={onCamLoad}
            ref={camera}
            photo={true}
          />
        ) : (
          <Text
            style={{
              color: 'red',
            }}>
            Cam Error!
          </Text>
        )}
        <TouchableOpacity onPress={captureImage}>
          <Text
            style={{
              color: 'blue',
              padding: 30,
              backgroundColor: '#F0F8FF',
              textAlign: 'center'
            }}>
            Capture
          </Text>
        </TouchableOpacity>
        <Text style={{
          color: 'black',
        }}>Geolocation</Text>
        {showL ? (
          <>
            <Text style={{
              color: 'black',
            }}>Time to get location: {lTime}ms</Text>
            <Text style={{
              color: 'black',
            }}>Current Location:{`\nLatitude: ${coords?.coords?.latitude}\nLongitude: ${coords?.coords?.longitude}\nAltitude: ${coords?.coords?.altitude}`}</Text>
            <TouchableOpacity onPress={getCurLocation}>
              <Text
                style={{
                  color: 'blue',
                  padding: 30,
                  backgroundColor: '#F0F8FF',
                  textAlign: 'center'
                }}>
                Get location
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{
            color: 'red',
          }}>Geo Error!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
