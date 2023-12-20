import { View } from "native-base";
import { PropsWithChildren } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Modal from 'react-native-modal';

function Inner({ children, isVisible, close }: PropsWithChildren<any>) {
  return (
    <Modal
      testID='modal'
      swipeDirection='down'
      propagateSwipe={true}
      isVisible={isVisible}
      onSwipeComplete={close}
      onBackdropPress={close}
      style={styles.view}
    >
      <View style={styles.content}>
        <View style={styles.puller} />
        {children}
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    zIndex: 0
  },
  content: {
    height: Dimensions.get('screen').height - 180,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  puller: {
    width: 90,
    height: 8,
    borderRadius: 99,
    backgroundColor: 'gray',
    marginTop: 15,
    marginBottom: 40
  }
});

export {
  Inner as Modal
};
