import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Zumos/Home.vue";
import Login from "./components/Usuarios/Login.vue";
import Register from "./components/Usuarios/Register.vue";

const CrearZumo = () => import("./components/Zumos/CrearZumo.vue")

const Profile = () => import("./components/Usuarios/Profile.vue")
const Usuarios = () => import("./components/Usuarios/Usuarios.vue")
const UsuarioDetalles = () => import("./components/Usuarios/UsuarioDetalles.vue")
const EditarUsuario = () => import("./components/Usuarios/EditarUsuario.vue")

const Maquinas = () => import("./components/Maquinas/Maquinas.vue")
const MaquinaDetalles = () => import("./components/Maquinas/MaquinaDetalles.vue")
const CrearMaquina = () => import("./components/Maquinas/CrearMaquina.vue")
const EditarMaquina = () => import("./components/Maquinas/EditarMaquina.vue")

const Comentarios = () => import("./components/Comentarios/Comentarios.vue")
const ComentariosDetalles = () => import("./components/Comentarios/ComentariosDetalles.vue")
const CrearComentario = () => import("./components/Comentarios/CrearComentario.vue")
const EditarComentario = () => import("./components/Comentarios/EditarComentario.vue")

const routes = [
  //ZUMOS
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/home/zumo/crear",
    name: "CrearZumo",
    component: CrearZumo,
  },

  //USUARIOS
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/usuario",
    name: "usuario",
    component: Usuarios,
  },
  {
    path: '/usuario/:id',
    name: 'UsuarioDetalles',
    component: UsuarioDetalles,
  },
  {
    path: '/usuario/editar/:id',
    name: 'EditarUsuario',
    component: EditarUsuario,
  },

  //MAQUINAS
  {
    path: "/maquina",
    name: "maquina",
    component: Maquinas,
  },
  {
    path: '/maquina/:id',
    name: 'MaquinaDetalles',
    component: MaquinaDetalles,
  },
  {
    path: '/maquina/crear',
    name: 'CrearMaquina',
    component: CrearMaquina,
  },
  {
    path: '/maquina/editar/:id',
    name: 'EditarMaquina',
    component: EditarMaquina,
  },

  //COMENTARIOS
  {
    path: "/comentarios",
    name: "comentarios",
    component: Comentarios,
  },
  {
    path: '/comentarios/:id',
    name: 'ComentarioDetalles',
    component: ComentariosDetalles,
  },
  {
    path: '/comentarios/crear',
    name: 'CrearComentario',
    component: CrearComentario,
  },
  {
    path: '/comentarios/editar/:id',
    name: 'EditarComentario',
    component: EditarComentario,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;