import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, addItem, removeItem } from "./menuSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [showAddLayout, setShowAddLayout] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const submit = (e) => {
    e.preventDefault();
    dispatch(addItem({ name, price: parseInt(price), image }));
    setShowAddLayout(false);
    setName("");
    setPrice("");
    setImage("");
  };
  const items = useSelector((state) => state.items.items);
  return (
    <div className="menu">
      {showAddLayout && (
        <div className="addItemLayout">
          <form className="menuForm" onSubmit={submit}>
            <div className="close" onClick={() => setShowAddLayout(false)}>
              X
            </div>
            <div className="flex">
              <p>name </p>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex">
              <p>price</p>
              <input value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="flex">
              <p>picture</p>
              <input value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <input type="submit" value="Add" />
          </form>
        </div>
      )}
      <div className="headline">
        Items <span onClick={() => setShowAddLayout(true)}>+</span>
      </div>
      <div className="items">
        {items?.map((item) => {
          return (
            <div className="item">
              <p
                className="delete"
                onClick={() => dispatch(removeItem({ _id: item._id }))}
              >
                X
              </p>
              <p>
                Name <div className="field">{item.name}</div>
              </p>
              <p>
                Price <div className="field">{item.price}</div>
              </p>
              <img
                src={item.image}
                alt=""
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </div>
          );
        })}
      </div>

      <button className="button" onClick={() => dispatch(getItems())}>
        refresh
      </button>
    </div>
  );
}
