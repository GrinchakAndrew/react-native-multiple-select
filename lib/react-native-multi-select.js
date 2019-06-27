import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  UIManager
} from "react-native";
import PropTypes from "prop-types";
import reject from "lodash/reject";
import find from "lodash/find";
import get from "lodash/get";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles, { colorPack } from "./styles";

// set UIManager LayoutAnimationEnabledExperimental
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class MultiSelect extends Component {
  static propTypes = {
    single: PropTypes.bool,
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    uniqueKey: PropTypes.string,
    tagBorderColor: PropTypes.string,
    tagTextColor: PropTypes.string,
    fontFamily: PropTypes.string,
    tagRemoveIconColor: PropTypes.string,
    onSelectedItemsChange: PropTypes.func.isRequired,
    selectedItemFontFamily: PropTypes.string,
    selectedItemTextColor: PropTypes.string,
    itemFontFamily: PropTypes.string,
    itemTextColor: PropTypes.string,
    itemFontSize: PropTypes.number,
    selectedItemIconColor: PropTypes.string,
    searchInputPlaceholderText: PropTypes.string,
    searchInputStyle: PropTypes.object,
    selectText: PropTypes.string,
    altFontFamily: PropTypes.string,
    hideSubmitButton: PropTypes.bool,
    autoFocusInput: PropTypes.bool,
    submitButtonColor: PropTypes.string,
    submitButtonText: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    fixedHeight: PropTypes.bool,
    hideTags: PropTypes.bool,
    canAddItems: PropTypes.bool,
    onAddItem: PropTypes.func,
    onChangeInput: PropTypes.func,
    displayKey: PropTypes.string
  };

  static defaultProps = {
    single: false,
    selectedItems: [],
    items: [],
    uniqueKey: "_id",
    tagBorderColor: colorPack.primary,
    tagTextColor: colorPack.primary,
    fontFamily: "",
    tagRemoveIconColor: colorPack.danger,
    onSelectedItemsChange: () => {},
    selectedItemFontFamily: "",
    selectedItemTextColor: colorPack.primary,
    itemFontFamily: "",
    itemTextColor: colorPack.textPrimary,
    itemFontSize: 16,
    selectedItemIconColor: colorPack.primary,
    searchInputPlaceholderText: "Search",
    searchInputStyle: { color: colorPack.textPrimary },
    textColor: colorPack.textPrimary,
    selectText: "Select",
    altFontFamily: "",
    hideSubmitButton: false,
    autoFocusInput: true,
    submitButtonColor: "#CCC",
    submitButtonText: "Submit",
    fontSize: 14,
    fixedHeight: false,
    hideTags: false,
    onChangeInput: () => {},
    displayKey: "name",
    canAddItems: false,
    onAddItem: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      selector: false,
      searchTerm: ""
    };
  }

  shouldComponentUpdate() {
    // console.log('Component Updating: ', nextProps.selectedItems);
    return true;
  }

  getSelectedItemsExt = optionalSelctedItems => (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap"
      }}
    >
      {this._displaySelectedItems(optionalSelctedItems)}
    </View>
  );

  _onChangeInput = value => {
    const { onChangeInput } = this.props;
    if (onChangeInput) {
      onChangeInput(value);
    }
    this.setState({ searchTerm: value });
  };

  _getSelectLabel = () => {
    const { selectText, single, selectedItems, displayKey } = this.props;
    if (!selectedItems || selectedItems.length === 0) {
      return selectText;
    } else if (single) {
      const item = selectedItems[0];
      const foundItem = this._findItem(item);
      return get(foundItem, displayKey) || selectText;
    }
    return `${selectText} (${selectedItems.length} selected)`;
  };

  _findItem = itemKey => {
    const { items, uniqueKey } = this.props;
    return find(items, singleItem => singleItem[uniqueKey] === itemKey) || {};
  };

  _displaySelectedItems = optionalSelctedItems => {
    const {
      fontFamily,
      tagRemoveIconColor,
      tagBorderColor,
      uniqueKey,
      tagTextColor,
      selectedItems,
      displayKey
    } = this.props;
    const actualSelectedItems = optionalSelctedItems || selectedItems;
    return actualSelectedItems.map(singleSelectedItem => {
      const item = this._findItem(singleSelectedItem);
      if (!item[displayKey]) return null;
      return (
        <View
          style={[
            styles.selectedItem,
            {
              width: item[displayKey].length * 8 + 60,
              justifyContent: "center",
              height: 50,
              borderColor: tagBorderColor
            }
          ]}
          key={item[uniqueKey]}
        >
          <Text
            style={[
              {
                flex: 1,
                color: tagTextColor,
                fontSize: 15
              },
              fontFamily ? { fontFamily } : {}
            ]}
            numberOfLines={1}
          >
            {item[displayKey]}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this._removeItem(item);
            }}
          >
            <Icon
              name="close-circle"
              style={{
                color: tagRemoveIconColor,
                fontSize: 22,
                marginLeft: 10
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  _removeItem = item => {
    const { uniqueKey, selectedItems, onSelectedItemsChange } = this.props;
    const newItems = reject(
      selectedItems,
      singleItem => item[uniqueKey] === singleItem
    );
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems);
  };

  _removeAllItems = () => {
    const { onSelectedItemsChange } = this.props;
    // broadcast new selected items state to parent component
    onSelectedItemsChange([]);
  };

  _toggleSelector = () => {
    this.setState(
      {
        selector: !this.state.selector
      },
      () => {
        this.props.onSelectorToggleCallback(this.state.selector);
      }
    );
  };

  _clearSearchTerm = () => {
    this.setState({
      searchTerm: ""
    });
  };

  _submitSelection = () => {
    this._toggleSelector();
    // reset searchTerm
    this._clearSearchTerm();
  };

  _itemSelected = item => {
    const { uniqueKey, selectedItems } = this.props;
    return selectedItems.indexOf(item[uniqueKey]) !== -1;
  };

  _addItem = () => {
    const {
      uniqueKey,
      items,
      selectedItems,
      onSelectedItemsChange,
      onAddItem
    } = this.props;
    let newItems = [];
    let newSelectedItems = [];
    const newItemName = this.state.searchTerm;
    if (newItemName) {
      const newItemId = newItemName
        .split(" ")
        .filter(word => word.length)
        .join("-");
      newItems = [...items, { [uniqueKey]: newItemId, name: newItemName }];
      newSelectedItems = [...selectedItems, newItemId];
      onAddItem(newItems);
      onSelectedItemsChange(newSelectedItems);
      this._clearSearchTerm();
    }
  };

  _toggleItem = item => {
    const {
      single,
      uniqueKey,
      selectedItems,
      onSelectedItemsChange
    } = this.props;
    if (single) {
      this._submitSelection();
      onSelectedItemsChange([item[uniqueKey]]);
    } else {
      const status = this._itemSelected(item);
      let newItems = [];
      if (status) {
        newItems = reject(
          selectedItems,
          singleItem => item[uniqueKey] === singleItem
        );
      } else {
        newItems = [...selectedItems, item[uniqueKey]];
      }
      // broadcast new selected items state to parent component
      onSelectedItemsChange(newItems);
    }
  };

  _itemStyle = item => {
    const {
      selectedItemFontFamily,
      selectedItemTextColor,
      itemFontFamily,
      itemTextColor,
      itemFontSize
    } = this.props;
    const isSelected = this._itemSelected(item);
    const fontFamily = {};
    if (isSelected && selectedItemFontFamily) {
      fontFamily.fontFamily = selectedItemFontFamily;
    } else if (!isSelected && itemFontFamily) {
      fontFamily.fontFamily = itemFontFamily;
    }
    const color = isSelected
      ? { color: selectedItemTextColor }
      : { color: itemTextColor };
    return {
      ...fontFamily,
      ...color,
      fontSize: itemFontSize,
      backgroundColor: "#0A334A"
    };
  };

  _getRow = item => {
    const { selectedItemIconColor, displayKey } = this.props;
    return (
      <TouchableOpacity
        disabled={item.disabled}
        onPress={() => this._toggleItem(item)}
        style={styles.getRowTouchable}
      >
        <View>
          <View style={styles.getRowNewViewView}>
            {this._itemSelected(item) ? (
              <Icon
                name="pencil"
                style={[
                  styles.iconPencilSelected,
                  { backgroundColor: selectedItemIconColor }
                ]}
              />
            ) : (
              <Icon name="pencil" style={styles.iconPencilNonSelected} />
            )}
            <Text
              style={[
                styles.getRowText,
                this._itemStyle(item),
                item.disabled ? { color: "grey" } : {}
              ]}
            >
              {item[displayKey]}
            </Text>
            {/* {this._itemSelected(item) ? (
              <Icon
                name="check"
                style={{
                  fontSize: 20,
                  color: selectedItemIconColor
                }}
              />
            ) : null} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _getRowNew = item => (
    <TouchableOpacity
      disabled={item.disabled}
      onPress={() => this._addItem(item)}
      style={styles.getRowNewTouchable}
    >
      <View>
        <View style={styles.getRowNewViewView}>
          <Text
            style={[
              styles.getRowNewStyle,
              this._itemStyle(item),
              item.disabled ? { color: "grey" } : {}
            ]}
          >
            Add {item.name} (tap or press return)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  _filterItems = searchTerm => {
    const { items, displayKey } = this.props;
    const filteredItems = [];
    items.forEach(item => {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join("|")})`, "ig");
      if (regex.test(get(item, displayKey))) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _renderItems = () => {
    const {
      canAddItems,
      items,
      fontFamily,
      uniqueKey,
      selectedItems
    } = this.props;
    const { searchTerm } = this.state;
    let component = null;
    // If searchTerm matches an item in the list, we should not add a new
    // element to the list.
    let searchTermMatch;
    let itemList;
    let addItemRow;
    const renderItems = searchTerm ? this._filterItems(searchTerm) : items;
    if (renderItems.length) {
      itemList = (
        <FlatList
          style={styles.flatList}
          data={renderItems}
          extraData={selectedItems}
          keyExtractor={item => item[uniqueKey]}
          renderItem={rowData => this._getRow(rowData.item)}
        />
      );
      searchTermMatch = renderItems.filter(item => item.name === searchTerm)
        .length;
    } else if (!canAddItems) {
      itemList = (
        <View style={styles.itemListWrapper}>
          <Text
            style={[
              styles.itemListText,
              {
                color: colorPack.danger
              },
              fontFamily ? { fontFamily } : {}
            ]}
          >
            No item to display.
          </Text>
        </View>
      );
    }

    if (canAddItems && !searchTermMatch && searchTerm.length) {
      addItemRow = this._getRowNew({ name: searchTerm });
    }
    component = (
      <View>
        {itemList}
        {addItemRow}
      </View>
    );
    return component;
  };

  render() {
    const {
      selectedItems,
      single,
      fontFamily,
      altFontFamily,
      searchInputPlaceholderText,
      searchInputStyle,
      hideSubmitButton,
      autoFocusInput,
      submitButtonColor,
      submitButtonText,
      fontSize,
      textColor,
      fixedHeight,
      hideTags
    } = this.props;
    const { searchTerm, selector } = this.state;

    return (
      <View style={styles.column}>
        {selector ? (
          <View style={styles.selectorView(fixedHeight)}>
            <View style={styles.inputGroup}>
              {/* <Icon
                name="magnify"
                size={20}
                color={colorPack.placeholderTextColor}
                style={{ marginRight: 10 }}
              /> */}
              <TextInput
                autoFocus={false}
                onChangeText={this._onChangeInput}
                blurOnSubmit={true}
                onSubmitEditing={this._addItem}
                placeholder={searchInputPlaceholderText}
                placeholderTextColor={colorPack.placeholderTextColor}
                underlineColorAndroid="transparent"
                style={[searchInputStyle, styles.flex]}
                value={searchTerm}
                editable={false}
              />
              {hideSubmitButton && (
                <TouchableOpacity onPress={this._submitSelection}>
                  <Icon
                    name="menu-down"
                    style={[
                      {
                        color: colorPack.light
                      },
                      styles.menuDown
                    ]}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.pinkLine} />
            <View style={styles.fafafa}>
              <View>{this._renderItems()}</View>
              {!single && !hideSubmitButton && (
                <TouchableOpacity
                  onPress={() => this._submitSelection()}
                  style={[
                    styles.button,
                    { backgroundColor: submitButtonColor }
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      fontFamily ? { fontFamily } : {}
                    ]}
                  >
                    {submitButtonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={this._toggleSelector}>
            <View style={styles.dropdownView}>
              <View style={[styles.subSection, styles.subSectonAdded]}>
                <View style={styles.textWrapperView}>
                  <Text
                    style={[
                      {
                        flex: 1,
                        fontSize: fontSize || 16,
                        color: textColor || colorPack.placeholderTextColor
                      },
                      altFontFamily
                        ? { fontFamily: altFontFamily }
                        : fontFamily
                        ? { fontFamily }
                        : {}
                    ]}
                    numberOfLines={1}
                  >
                    {this._getSelectLabel()}
                  </Text>
                  <Icon
                    name={hideSubmitButton ? "menu-right" : "menu-down"}
                    style={styles.indicator}
                    onPress={this._toggleSelector}
                  />
                </View>
              </View>
            </View>
            {!single && !hideTags && selectedItems.length ? (
              <View style={styles.rowFlexWrap}>
                {this._displaySelectedItems()}
              </View>
            ) : null}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
