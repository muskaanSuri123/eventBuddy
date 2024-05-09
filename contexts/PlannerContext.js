import React, { createContext, useState } from "react";
import uuid from "react-uuid";
export const PlannerContext = createContext({
  currentLocation: null,
  setCurrentLocation: () => {},
  venue: null,
  addVenue: () => {},
  playlist: null,
  eventDate: null,
  addPlaylist: () => {},
  guestList: null,
  addGuestlist: () => {},
  todos: [],
  addTodos: () => {},
  removeTodo: () => {},
  modeLight: true,
  setModeValue: () => {},
  invitation: {
    name: "ashley's",
    name1: "pedro",
    name2: "sandra",
    date: new Date(),
    time: "8:00pm",
    venue: "palsade gardens 245 stoney creek",
    couple: "ryan and ashley",
    address: "1294wayward lane sand diego",
    number: "1234567",
    year: "twenty'th",
  },
  setInvitation: () => {},
  selectedInvitation:"",
  setSelectedInvitation:() => {}
});

const PlannerProvider = ({ children }) => {
  const id = uuid();
  const [location, setLocation] = useState(null);
  const [venue, setVenue] = useState(null);
  const [invitationData, setInvitationData] = useState({
    name: "ashley's",
    name1: "pedro",
    name2: "sandra",
    date: new Date(),
    time: "8:00pm",
    venue: "palsade gardens 245 stoney creek",
    couple: "ryan and ashley",
    address: "1294wayward lane sand diego",
    number: "1234567",
    year: "twenty'th",
  });
  const [invitationString,setInvitationString] = useState("")
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [eventStartDate, setEventStartDate] = useState(null);
  const [guestListDetails, setGuestlistDetails] = useState(null);
  const [todos, setTodos] = useState([]);
  const [modeLight, setModeLight] = useState(true);
  const addVenue = (venue) => {
    setVenue(venue);
  };
  const setCurrentLocation = (locationVal) => {
    setLocation(locationVal);
  };

  const addPlaylist = (playlist) => {
    setPlaylistDetails(playlist);
  };
  const addGuestlist = (guestList) => {
    setGuestlistDetails(guestList);
  };
  const handleEventDate = (eventDate) => {
    setEventStartDate(eventDate);
  };
  const addTodos = (todos) => {
    setTodos(todos);
  };
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const setInvitation = (data) => {
    setInvitationData(data);
  };

  const setSelectedInvitation = (string) =>{
    setInvitationString(string)
  }

  const value = {
    currentLocation: location,
    setCurrentLocation: setCurrentLocation,
    venue: venue,
    addVenue: addVenue,
    playlist: playlistDetails,
    eventDate: eventStartDate,
    guestList: guestListDetails,
    handleEventDate: handleEventDate,
    addGuestlist: addGuestlist,
    addPlaylist: addPlaylist,
    todos: todos,
    addTodos: addTodos,
    removeTodo: removeTodo,
    modeLight: modeLight,
    setModeValue: setModeLight,
    invitation: invitationData,
    setInvitation: setInvitation,
    selectedInvitation: invitationString,
    setSelectedInvitation: setSelectedInvitation
  };
  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  );
};

export { PlannerProvider };
