import React, { useState, useEffect } from "react";
import "./App.css";
import ChannelItem from "./components/ChannelItem";
import Mehmoji from "./components/icons/Mehmoji";
import SearchIcon from "./components/icons/SearchIcon";

const App = () => {
  const [list, setList] = useState([
    { id: 1, name: "Team@trengo.com", iconType: "solid", icon: "phone-alt" },
    { id: 2, name: "Call center", iconType: "solid", icon: "phone-alt" },
    { id: 3, name: "Whatsapp business", iconType: "brands", icon: "whatsapp" },
    {
      id: 4,
      name: "(test) development California",
      iconType: "regular",
      icon: "envelope",
    },
    {
      id: 5,
      name: "Whatsapp Business Iceland",
      iconType: "brands",
      icon: "whatsapp",
    },
  ]);

  const [iconList] = useState([
    "comments",
    "hand-pointer",
    "address-card",
    "bookmark",
    "calendar",
  ]);

  const [appData, setAppData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const saveToStorage = (arr) => {
    let channelList = JSON.stringify(arr);
    localStorage.setItem("channelList", channelList);
  };

  const retrieveFromStorage = () => {
    let list = JSON.parse(localStorage.getItem("channelList"));
    setList(list);
  };

  const filterSearch = (e) => {
    setSearchTerm(e.target.value);
    const newList = appData.filter((item) => item.name.match(searchTerm));
    setList(newList);
    setShowConfirmation(true);
  };

  const createChannel = (name, e) => {
    if (e.keyCode === 13) {
      let channel = {
        id: appData.length + 1,
        name: name,
        iconType: "regular",
        icon: iconList[Math.floor(Math.random() * iconList.length)],
      };

      setAppData((prev) => [...appData, channel]);
      setList(appData);
    }
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    saveToStorage(list);
    if (!list.length && searchTerm) {
    }
    setSearchTerm("");
    setShowConfirmation(false);
  };

  const denyAction = () => {
    retrieveFromStorage();
    setSearchTerm("");
    setShowConfirmation(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("channelList")) saveToStorage(list);
    retrieveFromStorage();

    setAppData(list);
  }, []);

  return (
    <div className="App">
      <div className="card">
        <div className="search-area">
          <form onSubmit={(e) => e.preventDefault()}>
            <SearchIcon />
            <input
              onChange={filterSearch}
              onKeyDown={(e) => createChannel(searchTerm, e)}
              type="text"
              placeholder="Find or Add a Channel..."
              autoFocus
              value={searchTerm}
            />
          </form>
        </div>
        <div className="list-container">
          {list.length ? (
            list.map((item, index) => {
              return (
                <ChannelItem
                  item={item}
                  removeItem={removeItem}
                  key={item.id ?? index}
                />
              );
            })
          ) : (
            <div className="no-items">
              <Mehmoji />
              <p>There are no channels left. Type to add a channel</p>
            </div>
          )}
        </div>
        <div
          className="actions-container"
          style={{ display: showConfirmation ? "flex" : "none" }}
        >
          <button id="cancel" onClick={denyAction}>
            Cancel
          </button>
          <button id="apply" onClick={confirmAction}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
