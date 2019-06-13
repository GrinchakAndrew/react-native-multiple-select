/*!
 * react-native-multi-select
 * Copyright(c) 2017 Mustapha Babatunde Oluwaleke
 * MIT Licensed
 */

export const colorPack = {
  primary: "#00A5FF",
  primaryDark: "#215191",
  light: "#FFF",
  textPrimary: "#525966",
  placeholderTextColor: "#A9A9A9",
  danger: "#C62828",
  borderColor: "#e9e9e9",
  backgroundColor: "#b1b1b1"
};

export default {
  footerWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  footerWrapperNC: {
    width: 320,
    flexDirection: "column"
  },
  subSection: {
    backgroundColor: "#0A334A", //colorPack.light,
    borderBottomWidth: 1,
    borderColor: colorPack.borderColor,
    paddingLeft: 0,
    paddingRight: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  greyButton: {
    height: 40,
    borderRadius: 5,
    elevation: 0,
    backgroundColor: colorPack.backgroundColor
  },
  indicator: {
    fontSize: 35,
    color: colorPack.light,
    marginRight: -30
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 2
  },
  button: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: colorPack.light,
    fontSize: 14
  },
  selectorView: fixedHeight => {
    const style = {
      flexDirection: "column",
      marginBottom: 10,
      elevation: 2
    };
    if (fixedHeight) {
      style.height = 250;
    }
    return style;
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    backgroundColor: "#0A334A"
  },
  dropdownView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: 50, //40,
    marginBottom: 0, //10,
    width: "87%",
    marginLeft: -23
  },
  iconPencilNonSelected: {
    fontSize: 20,
    color: "#CCC",
    backgroundColor: "#0A334A",
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#FFF"
  },

  iconPencilSelected: {
    fontSize: 20,
    color: "#FFF",
    marginRight: 20
  },
  subSectonAdded: { paddingTop: 10, paddingBottom: 5 },
  textWrapperView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },

  rowFlexWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  column: {
    flexDirection: "column",
    marginBottom: 0 //10
  },

  pinkLine: {
    borderBottomColor: "#f18a9b",
    width: "50%",
    borderBottomWidth: 1,
    marginLeft: 15
  },
  fafafa: {
    flexDirection: "column",
    backgroundColor: "#fafafa"
  },

  flex: { flex: 1 },
  menuDown: {
    paddingLeft: 15,
    paddingRight: 30,
    fontSize: 35,
    marginRight: 0
  },
  itemListText: {
    flex: 1,
    marginTop: 20,
    textAlign: "center"
  },
  itemListWrapper: { flexDirection: "row", alignItems: "center" },
  flatList: { backgroundColor: "#0A334A", paddingTop: 15 },
  getRowNewStyle: {
    flex: 1,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5
  },
  getRowNewTouchable: { paddingLeft: 20, paddingRight: 20 },
  getRowNewViewView: { flexDirection: "row", alignItems: "center" },
  getRowText: {
    flex: 1,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5
  },
  getRowTouchable: { paddingLeft: 20, paddingRight: 20, paddingTop: 20 }
};
