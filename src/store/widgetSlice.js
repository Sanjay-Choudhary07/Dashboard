import { createSlice } from "@reduxjs/toolkit";
import widgetData from "../data/data.json";
import { toast } from 'react-toastify';

const initialState = {
  widget: widgetData.categories,
};

export const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.widget.push({
        name: action.payload.name,
        widgets: [],
      });
    },
    addWidget: (state, action) => {
      const { categoryName, widget } = action.payload;
      const category = state.widget.find((cat) => cat.name === categoryName);
      if (category) {
        category.widgets.push({
          id: new Date().getTime(),
          name: widget.name,
          text: widget.text,
        });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.widget.find((cat) => cat.name === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
      }
    },
    searchWidget: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm.length == 0) {
        state.widget = widgetData.categories;
        return;
      }
      const results = state.widget
        .map((category) => {
          const filteredWidgets = category.widgets.filter(
            (widget) =>
              widget.name.toLowerCase().includes(searchTerm) ||
              widget.text.toLowerCase().includes(searchTerm)
          );
          if (filteredWidgets.length > 0) {
            return {
              name: category.name,
              widgets: filteredWidgets,
            };
          }
          return null;
        })
        .filter((category) => category !== null);

      state.widget = results;
    },
    setCategory: (state, action) => {
      const { category, widget } = action.payload;
      state.widget = [
        {
          name: category,
          widgets: widget,
        },
      ];
    },
    deleteCategory : (state,action) =>{
      const {categoryName} = action.payload;
      console.log(categoryName)
      state.widget = state.widget.filter((cat) => cat.name != categoryName)
    }
  },
});

export const {
  addCategory,
  addWidget,
  removeWidget,
  searchWidget,
  setCategory,
  deleteCategory
} = widgetSlice.actions;
export default widgetSlice.reducer;