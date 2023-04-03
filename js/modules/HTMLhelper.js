/** Clase helper para encapsular la interacción con el DOM. */
export default class HTMLhelper{
    #document;

    /**
     * Crea un objeto tipo HTMLhelper.
     * @param {Document} _documento - la referencia al DOM.
     */
    constructor(documento){
        this.#document = documento;
        //document.getElementById("wrapper").remove();
        this.#inicializarHTML();
        this.#cargarSBAdminScript();
    }

    #inicializarHTML() {
        //Body
        this.#document.body.id = "page-top";
        this.#document.body.className = "sidebar-toggled";
        //Wrapper Div
        const wrapperElement = this.#AgregarElementoHTML({
            _id: "wrapper",
            _padre: this.#document.body});
        //Sidebar
        this.#crearSideBar(wrapperElement);
        //Content Wrapper Div
        const contentWrapperElement = this.#AgregarElementoHTML({
            _id: "content-wrapper",
            _clases: "d-flex flex-columm",
            _padre: wrapperElement});
        //Content Div
        const contentElement = this.#AgregarElementoHTML({
            _id: "content",
            _padre: contentWrapperElement}); 
        //Nav
        this.#crearNav(contentElement);
        
        //Container Fluid - Page content
        const containerFluidElement = this.#AgregarElementoHTML({
            _id: "main-content",
            _clases: "container-fluid",
            _padre: contentElement}); 

        this.displayDashboardPage();
            
    }

    #crearSideBar(nodoPadre){
        const sideBarElement = this.#AgregarElementoHTML({
            _tipo: "ul",
            _id: "accordionSidebar",
            _clases: "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion",
            _padre: nodoPadre});

        const titulo = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "sidebar-brand d-flex align-items-center justify-content-center",
            _href: "index.html",
            _padre: sideBarElement});
        titulo.innerHTML = `<div class="sidebar-brand-icon"><i class="fas fa-donate"></i>
            </div><div class="sidebar-brand-text mx-3">Divisor-Gastos</div>`;
        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider my-0",_padre: sideBarElement});
        
        this.#AgregarElementoHTML({
            _tipo: "li",
            _id: "dashboard-item",
            _clases: "nav-item",
            _padre: sideBarElement}).innerHTML = `<a class="nav-link" href="#">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>`;

        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider",_padre: sideBarElement});        
            
        this.#AgregarElementoHTML({_clases: "sidebar-heading",_padre: sideBarElement}).innerHTML = `Menu`;

        this.#crearSeccionSidebar("Grupos",["Crear Grupo", "Mis Grupos"],"users", sideBarElement);
        this.#crearSeccionSidebar("Gastos",["Crear Gasto", "Mis Gastos"],"dollar-sign", sideBarElement);

        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider d-none d-md-block",_padre: sideBarElement});
        //SidebarToggleButton
        this.#AgregarElementoHTML({_clases: "text-center d-none d-md-inline",_padre: sideBarElement}).innerHTML 
            = `<button class="rounded-circle border-0" id="sidebarToggle"></button>`;

        return sideBarElement;
    }

    #crearNav(nodoPadre){
        const navElement = this.#AgregarElementoHTML({
            _tipo: "nav",
            _clases: "navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow",
            _padre: nodoPadre});
        
            const navButton = this.#AgregarElementoHTML({
                _tipo: "button",
                _id: "sidebarToggleTop",
                _clases: "btn btn-link d-md-none rounded-circle mr-3",
                _padre: navElement});
            navButton.innerHTML = `<i class="fa fa-bars"></i>`;
            
        const navBar = this.#AgregarElementoHTML({
            _tipo: "ul",
            _clases: "navbar-nav ml-auto",
            _padre: navElement});

        //Alertas
        const navBarAlerts = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "nav-item dropdown no-arrow mx-1",
            _padre: navBar});

        const aAlertas = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link dropdown-toggle",
            _id: "alertsDropdown",
            _href: "#",
            _padre: navBarAlerts});
        aAlertas.innerHTML = `<i class="fas fa-bell fa-fw"></i>
        <span class="badge badge-danger badge-counter">1</span>`;
        aAlertas.setAttribute('role','button');
        aAlertas.setAttribute('data-toggle','dropdown');
        aAlertas.setAttribute('aria-haspopup','true');
        aAlertas.setAttribute('aria-expanded','false');
        
        const dropdownAlertas = this.#AgregarElementoHTML({
            _clases: "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in",
            _padre: navBarAlerts});
        dropdownAlertas.setAttribute('aria-labelledby','alertsDropdown');
        dropdownAlertas.innerHTML = `<h6 class="dropdown-header">
                    Alertas
                </h6>
                <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="mr-3">
                        <div class="icon-circle bg-success">
                            <i class="fas fa-donate text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">Marzo, 2023</div>
                        Bienvenid@ al divisor de Gastos!
                    </div>
                </a>
                <a class="dropdown-item text-center small text-gray-500" href="#">Ver todas las
                    alertas</a>`;
        //Mensajes
        const navBarMensajes = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "nav-item dropdown no-arrow mx-1",
            _padre: navBar});

        const aMensajes = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link dropdown-toggle",
            _id: "messagesDropdown",
            _href: "#",
            _padre: navBarMensajes});
        aMensajes.innerHTML = `<i class="fas fa-envelope fa-fw"></i>
        <span class="badge badge-danger"></span>`;
        aMensajes.setAttribute('role','button');
        aMensajes.setAttribute('data-toggle','dropdown');
        aMensajes.setAttribute('aria-haspopup','true');
        aMensajes.setAttribute('aria-expanded','false');

        const dropdownMensajes = this.#AgregarElementoHTML({
            _clases: "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in",
            _padre: navBarMensajes});
        dropdownMensajes.setAttribute('aria-labelledby','messagesDropdown');
        dropdownMensajes.innerHTML = `<h6 class="dropdown-header">Mensajes</h6>
            <a class="dropdown-item text-center small text-gray-500" href="#">No hay mensajes</a>`;

        this.#AgregarElementoHTML({
            _clases: "topbar-divider d-none d-sm-block",
            _padre: navBar});

        //Info User
        const navBarUser = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "nav-item dropdown no-arrow",
            _padre: navBar});

        const aUser = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link dropdown-toggle",
            _id: "userDropdown",
            _href: "#",
            _padre: navBarUser});
        aUser.innerHTML = ` <span class="mr-2 d-none d-lg-inline text-gray-600 small">Usuario Coder</span>
        <img class="img-profile rounded-circle" src="img/undraw_profile.svg">`;
        aUser.setAttribute('role','button');
        aUser.setAttribute('data-toggle','dropdown');
        aUser.setAttribute('aria-haspopup','true');
        aUser.setAttribute('aria-expanded','false');
        
        const dropdownUser = this.#AgregarElementoHTML({
            _clases: "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in",
            _padre: navBarUser});
        dropdownUser.setAttribute('aria-labelledby','userDropdown');
        dropdownUser.innerHTML = `<a id="borrar-localStorage" class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Borrar localStorage</a>`;

        return navElement;
    }


    #crearSeccionSidebar(titulo,items,nombreIcono,padre){
        const sidebar = this.#AgregarElementoHTML({_tipo: "li",_clases: "nav-item",_padre: padre});
        
        const aSidebar = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link collapsed",
            _href: "#",
            _padre: sidebar});
        aSidebar.innerHTML = `<i class="fas fa-fw fa-${nombreIcono}"></i><span>${titulo}</span>`;
        titulo.replace(/ /g,'')
        aSidebar.setAttribute('data-toggle','collapse');
        aSidebar.setAttribute('data-target',`#collapse${titulo}`);
        aSidebar.setAttribute('aria-expanded','true');
        aSidebar.setAttribute('aria-controls',`#collapse${titulo}`);

        const collapseSidebar = this.#AgregarElementoHTML({
            _clases: "collapse",
            _id: `collapse${titulo}`,
            _href: "#",
            _padre: sidebar});
        collapseSidebar.setAttribute('aria-labelledby',`heading${titulo}`);
        collapseSidebar.setAttribute('data-parent','#accordionSidebar');

        const collapseGruposInnerElement = this.#AgregarElementoHTML({
            _clases: "bg-white py-2 collapse-inner rounded",
            _padre: collapseSidebar});


        items.forEach(item => {
            const itemOriginal = item;
            const crearGrupoElement = this.#AgregarElementoHTML({
                _id: `${item.replace(/ /g,'')}-item`,
                _clases: "collapse-item",
                _padre: collapseGruposInnerElement});
            crearGrupoElement.innerHTML = itemOriginal;
        });

    }

    #AgregarElementoHTML({_tipo,_id,_type,_name,_clases,_href,_padre}) {
        const element = this.#document.createElement(_tipo || "div");
        _id && (element.id = _id);
        _type && (element.type = _type);
        _name && (element.name = _name);
        _clases && (element.classList = _clases);
        _href && (element.href = _href);
        (_padre || this.#document.body)?.append(element);
        return element;
    }

    #cargarSBAdminScript(){
        //Tengo que cargar dinámicamente el js del Template ya que si no algunas cosas estéticas no funcionan.
        const fun = async function loadModule() {
            await import("../../js/vendor/sb-admin-2.min.js");
        }
        fun();
    }

    getItemHTML(id){
        return this.#document.getElementById(id);
    }

    queryHTML(id){
        return this.#document.querySelector(id);
    }

    displayNuevoGrupoPage(){
        this.#document.getElementById("collapseGrupos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
           main.innerHTML = 
                `<h1 class="h3 mb-2 text-gray-800">Nuevo Grupo</h1>
                <div class="row">
                    <div class="col-xl-6 col-md-6 mb-4">
                        <form class="form" id="form-crear-grupo">
                            <div class="form-floating">
                                <input type="text" class="form-control mb-2 mr-sm-2" id="nombre" placeholder="Nombre">
                                <label for="nombre">Nombre Grupo</label>
                            </div>
                            <div class="radio">
                            
                                <input type="radio" class="btn-check" name="options" id="option1" value="viaje" autocomplete="off" checked />
                                <label class="btn btn-outline-primary" for="option1">
                                <i class="fas fa-fw fa-plane"></i>Viaje</label>
                                
                                <input type="radio" class="btn-check" name="options" id="option2" value="amigos" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option2">
                                <i class="fas fa-fw fa-users"></i>Amigos</label>

                                <input type="radio" class="btn-check" name="options" id="option3" value="pareja" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option3">
                                <i class="fas fa-fw fa-heart"></i>Pareja</label>

                                <input type="radio" class="btn-check" name="options" id="option4" value="otros" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option4">Otros</label>
                            </div>
                            <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon1"><i class="fas fa-fw fa-plus"></i>Integrante</button>
                                <div class="form-floating">
                                    <input type="text" class="form-control" placeholder="Nombre integrante"  id="text-button-addon1">
                                    <label for="text-button-addon1">Nombre Integrante</label>
                                </div>
                            </div>
                            <label class="" for="">Integrantes: </label>
                            <ul class="list-group" id="listaNuevoIntegrante">
                            <li class="list-group-item disabled">Usuario Coder (Yo)</li>
                            </ul>
                            
                            <button type="submit" class="btn btn-primary my-2">Crear</button>
                        </form>
                    </div>
                </div>`;
                
                        
         return main;
    }

    displayMisGruposPage(_arrayGrupos){
        this.#document.getElementById("collapseGrupos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
        
        let cardArray = [];
           _arrayGrupos.forEach(element => {
            const card = `<div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary"><span>
                <a href="#" class="btn-sm btn-info btn-circle" data-id='grupo-${element.id}'>
                <i class="fas fa-info-circle"></i></a>
                </span>${element.nombre}
                </h6>     
            </div>
            <div class="card-body">
            <p>Id del grupo: ${element.id}</p>
            <p>Nombre del grupo: ${element.nombre}</p>
            <p>Cantidad de integrantes: ${element.cantIntegrantes}</p>
            </div>
        </div>`;
            cardArray.push(card);
        });

        const cards = cardArray.join(" ") || `<div class="alert alert-secondary" role="alert">
        Aun no hay grupos creados :(
      </div>`;

        main.innerHTML = 
           `<h1 class="h3 mb-0 text-gray-800">Mis Grupos</h1>
           ` + cards;

        return main;
    }
    
    displayGrupoPage({info,integrantes,gastos,mensajeSaldos}){
        const main = this.#document.getElementById("main-content");
        const seccionInfo = `<h1 class="h3 mb-0 text-gray-800">Grupo</h1>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                Informacion
                </h6>     
            </div>
            <div class="card-body">
                <p>Id del grupo: ${info.id}</p>
                <p>Nombre del grupo: ${info.nombre}</p>
                <p>Tipo del grupo: ${info.tipoGrupo}</p>
                <p>Cantidad de integrantes: ${info.cantIntegrantes}</p>
            </div>
        </div>`;
        const seccionIntegrantes = `
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                Integrantes
                </h6>     
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">` +
                integrantes.map(element => {
                    return `<li class="list-group-item">${element}</li>`; 
                }).join("")
            + `</ul>
            </div>
        </div>`;

        const seccionGastos = 
        `<div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                Gastos
                </h6>     
            </div>
            <div class="card-body">
                <ul class="list-group">` +
                gastos.map(element => {
                    return `<li class="list-group-item disabled">Importe: $${element.importe.toFixed(2)} - Integrante: ${element.nombreIntegrante}</li>`; 
                }).join("")
            + `</ul>
            </div>
        </div>`;
        const seccionSaldos = 
        `<div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                Saldos
                </h6>     
            </div>
            <div class="card-body">` +
                mensajeSaldos.map(mensaje => `<p>${mensaje}</p>`).join("") 
            + `</div>
        </div>`;

        
        main.innerHTML = seccionInfo + seccionIntegrantes + seccionGastos + seccionSaldos;

     return main;
    }

    displayDashboardPage(){
        this.#document.getElementById("collapseGrupos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
           main.innerHTML = 
           `<div class="card shadow mb-4">
           <div class="card-header py-3">
               <h6 class="m-0 font-weight-bold text-primary">Divisor de Gastos - 3ra Pre-Entrega</h6>
           </div>
           <div class="card-body">
               <p>En esta pre-entrega se integra el DOM y el uso de JSON + localStorage. Se permiten las siguientes funcionalidades:</p>
               <p class="mb-0">* Crear Grupos</p>
               <p class="mb-0">* Ver los Grupos creados</p>
               <p class="mb-0">* Ver la información de cada grupo</p>
               <p class="mb-0">* Guardar los grupos en LocalStorage</p>
               <p class="mb-0">* Borrar la LocalStorage(desde el avatar de usuario)</p>
           </div>
       </div>`;
         return main;
    }

    displayNuevoGastoPage(){
        this.#document.getElementById("collapseGastos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
        main.innerHTML = 
                `<h1 class="h3 mb-2 text-gray-800">Nuevo Gasto</h1>
                <div class="row">
                    <div class="col-xl-6 col-xxl-2 col-md-6 mb-4">
                        <form class="form" id="form-crear-gasto">
                            <div class="input-group mb-3">
                                <span class="input-group-text">$</span>
                                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                            </div>
                            <div class="form-floating">
                                <input type="text" class="form-control mb-2 mr-sm-2" id="nombre" placeholder="Nombre">
                                <label for="nombre">Descripcion Gasto</label>
                            </div>
                            <label class="" for="">Tipo de Gasto: </label>
                            <div class="radio">
                            
                                <input type="radio" class="btn-check" name="options" id="option1" value="comida" autocomplete="off" checked />
                                <label class="btn btn-outline-primary" for="option1">
                                <i class="fas fa-fw fa-utensils"></i>Comida</label>
                                
                                <input type="radio" class="btn-check" name="options" id="option2" value="combustible" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option2">
                                <i class="fas fa-fw fa-gas-pump"></i>Combustible</label>

                                <input type="radio" class="btn-check" name="options" id="option3" value="alojamiento" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option3">
                                <i class="fas fa-fw fa-bed"></i>Alojamiento</label>

                                <input type="radio" class="btn-check" name="options" id="option4" value="varios" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option4">Varios</label>
                            </div>
                            <label class="" for="">Fecha:</label>
                            <input id="startDate" class="form-control" type="date" />
                            <select class="form-select my-2" aria-label="Default select example">
                            <option selected>Seleccione el Grupo</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                            <select class="form-select my-2" aria-label="Default select example">
                            <option selected>Seleccione el Integrante</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                            <button type="submit" class="btn btn-primary my-2">Crear</button>
                        </form>
                    </div>
                </div>`;
                         
         return main;
    }

    displayMensajeExitoso(mensaje){
        const main = this.#document.getElementById("main-content");
        main.innerHTML = `<div class="alert alert-success" role="alert">
        ${mensaje}
        </div>`
    }

    agregarIntegrante(id,nombre){
        const lista = this.#document.getElementById(id);

        const item = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "list-group-item",
            _padre: lista});
        //item.innerHTML = `${nombre} <i class="fas fa-fw fa-trash"></i>`;

        const borrar = this.#AgregarElementoHTML({
            _tipo: "i",
            _clases: "fas fa-fw fa-trash",
            _padre: item});
        item.insertBefore(this.#document.createTextNode(nombre), borrar);

        const itemHidden = this.#AgregarElementoHTML({
            _tipo: "input",
            _type: "hidden",
            _name: "integrantesLista",
            _id: id,
            _padre: lista});
        itemHidden.value = nombre;

        return item;
    }

    borrarIntegrante(id,item){
        const lista = this.#document.getElementById(id);
        lista.removeChild(item);
    }

}