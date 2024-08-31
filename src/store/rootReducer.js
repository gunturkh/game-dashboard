import layout from "./layout";
import todo from "../pages/app/todo/store";
import email from "../pages/app/email/store";
import chat from "../pages/app/chat/store";
import project from "../pages/app/projects/store";
import card from "../pages/app/cards/store";
import level from "../pages/app/levels/store";
import kanban from "../pages/app/kanban/store";
import auth from "./api/auth/authSlice";
import cart from "./api/shop/cartSlice";
import player from "../pages/app/players/store"
import task from "../pages/app/tasks/store"
import dailycombo from "../pages/app/dailycombo/store"

const rootReducer = {
  layout,
  todo,
  email,
  chat,
  card,
  project,
  kanban,
  auth,
  cart,
  level,
  player,
  task,
  dailycombo
};
export default rootReducer;
