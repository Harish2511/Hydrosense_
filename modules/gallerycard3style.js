import { StyleSheet } from 'react-native';


const Gallerystyles = StyleSheet.create({

".galleryCard": {
  width: "100%",
  height: "300px",
  display: "flex",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
},
".galleryImage": {
  top: "0px",
  left: "0px",
  right: "auto",
  width: "100%",
  bottom: "auto",
  height: "300px",
  position: "absolute",
  objectFit: "cover",
  borderRadius: "var(--dl-radius-radius-radius8)"
}
});
export {Gallerystyles}