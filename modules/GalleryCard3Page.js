import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Gallerystyles } from './gallerycard3style';

const GalleryCard3 = (props) => {
  return (
    <View style={[Gallerystyles.galleryCard, props.rootStyle]}>
      <Image
        source={{ uri: props.imageSrc }}
        style={Gallerystyles.galleryImage}
        resizeMode="cover"
      />
    </View>
  );
};

GalleryCard3.defaultProps = {
  imageSrc:
    'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fG1pbmltYWxpc20lMjBjb3VjaHxlbnwwfHx8fDE2MjY0NDg1NTk&ixlib=rb-1.2.1&w=1500',
  rootStyle: {},
  imageAlt: 'image',
};

GalleryCard3.propTypes = {
  imageSrc: PropTypes.string,
  rootStyle: PropTypes.object,
  imageAlt: PropTypes.string,
};

export default GalleryCard3;