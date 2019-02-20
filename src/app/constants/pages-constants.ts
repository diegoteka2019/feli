import { Page } from "@app/models/pages/page";

//TODO crear constantes para paginas especificas

export const APP_PAGES = {
    // DASHBOARD: new Page().setName("Dashboard").setUrl("/dashboard").setIcon("icon-dashboard-01").setSection(true),
    CATEGORIAS: new Page().setName("Categorias de Productos").setUrl("/categorias").setIcon("icon-categorias-01"),
    PRODUCTOS: new Page().setName("Productos").setUrl("/productos").setIcon("icon-productos-01").setSection(true),
    MARCAS: new Page().setName("Marcas").setUrl("/marcas").setIcon("icon-marcas-01"),
    LOCALES: new Page().setName("Locales").setUrl("/locales").setIcon("icon-locales-01").setSection(true),
    CATEGORIAS_BENEFICIOS: new Page().setName("Categorias de Beneficios").setUrl("/categorias-beneficios").setIcon("icon-categorias_beneficios-01"),
    TIPOS_BENEFICIOS: new Page().setName("Tipos de Beneficios").setUrl("/tipos-beneficios").setIcon("icon-tipos_beneficios-01"),
    BENEFICIOS: new Page().setName("Beneficios").setUrl("/beneficios").setIcon("icon-beneficios-01"),
    AGENDA_BENEFICIOS: new Page().setName("Agenda de Beneficios").setUrl("/agenda-beneficios").setIcon("icon-agenda-01").setSection(true),
    USUARIOS: new Page().setName("Usuarios").setUrl("/usuarios").setIcon("icon-usuarios-01"),
}

export const MAIN_PAGES = {
    LOGIN: new Page().setName("Login").setUrl("/login"),
    APP: new Page().setName("").setUrl("")
}