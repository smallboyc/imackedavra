const links = [
  { id: 1, title: "maisons", class: "child-link", href: "house", src: "hat" },
  { id: 2, title: "règles", class: "child-link", href: "rule", src: "owl" },
  { id: 3, title: "crédits", class: "child-link", href: "credit", src: "vif" },
];

class Button extends HTMLElement {
  constructor() {
    super();
    this.nav = document.createElement("nav");
    this.nav.id = "button-container";
    this.button = document.createElement("div");
    this.button.classList.add("button");

    //Création du bouton parent
    this.divParent = document.createElement("div");
    this.parent = document.createElement("div");
    this.imgParent = document.createElement("img");
    this.divParent.classList.add("parent");
    this.imgParent.src = `../../img/cross.svg`;
    this.parent.appendChild(this.imgParent);
    this.divParent.appendChild(this.parent);
    this.button.appendChild(this.divParent);
    this.nav.appendChild(this.button);
    this.appendChild(this.nav);

    //Création des liens
    links.forEach((link) => {
      this.divLink = document.createElement("div");
      this.link = document.createElement("a");
      this.imgLink = document.createElement("img");

      this.divLink.classList.add(link.class);
      this.link.title = link.title;
      this.link.href = `/${link.href}.html`;
      this.imgLink.src = `../../img/${link.src}.svg`;

      this.link.appendChild(this.imgLink);
      this.divLink.appendChild(this.link);
      this.button.appendChild(this.divLink);
      this.nav.appendChild(this.button);
      this.appendChild(this.nav);
    });
  }
}
customElements.define("magic-button", Button);
