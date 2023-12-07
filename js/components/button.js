const links = [
  { id: 0, class: "parent", href: "start", src: "cross" },
  { id: 1, class: "child-link", href: "house", src: "hat" },
  { id: 2, class: "child-link", href: "rule", src: "owl" },
  { id: 3, class: "child-link", href: "credit", src: "vif" },
];

class Button extends HTMLElement {
  constructor() {
    super();
    this.nav = document.createElement("nav");
    this.nav.id = "button-container";
    this.button = document.createElement("div");
    this.button.classList.add("button");
    links.forEach((link) => {
      //On créé nos balises
      this.divLink = document.createElement("div");
      this.link = document.createElement("a");
      this.imgLink = document.createElement("img");

      //On donne les propriétés à nos balises
      this.divLink.classList.add(link.class);
      this.link.href = `/${link.href}.html`;
      this.imgLink.src = `../../img/${link.src}.svg`;

      //On emboîte nos balises
      this.link.appendChild(this.imgLink);
      this.divLink.appendChild(this.link);
      this.button.appendChild(this.divLink);
      this.nav.appendChild(this.button);
      this.appendChild(this.nav);
    });

    console.log("New button");
  }
}
customElements.define("magic-button", Button);
