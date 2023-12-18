import IdeasApi from "../services/ideasApi";

class IdeaList {
  static _card = null;

  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    if (IdeaList._card === null) {
      IdeaList._card = this._ideaListEl.firstElementChild;
      // console.log(this._ideaListEl);
      this._ideaListEl.removeChild(IdeaList._card);
      // console.log(IdeaList._card);
      // console.log(this._ideaListEl);
      while (this._ideaListEl.firstElementChild)
        this._ideaListEl.removeChild(this._ideaListEl.firstElementChild);
    }
    this._ideas = [];
    this.getIdeas();

    // this._tagClasses = {''}
    this._validTags = new Set([
      "technology",
      "business",
      "inventions",
      "education",
      "software",
      "health",
    ]);
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        // console.log(ideaId);
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      //   console.log(this._ideas);
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You cannot delete this resource");
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    return this._validTags.has(tag) ? "tag-" + tag : "tag";
  }

  render() {
    while (this._ideaListEl.firstElementChild)
      this._ideaListEl.removeChild(this._ideaListEl.firstElementChild);
    for (let idea of this._ideas) {
      const card = IdeaList._card.cloneNode(true);
      card.setAttribute("data-id", idea._id);
      card.querySelector("h3").textContent = idea.text;
      //   card.querySelector(".tag").textContent = idea.tag.toUpperCase();
      card.querySelector(".date").textContent = idea.date;
      card.querySelector(".author").textContent = idea.username;
      if (idea.username !== localStorage.getItem("username"))
        card.removeChild(card.querySelector(".delete"));
      const tagNode = card.querySelector(".tag");
      tagNode.textContent = idea.tag.toUpperCase();
      tagNode.classList.replace(
        tagNode.classList.item(1),
        // "tag-" + idea.tag.toLowerCase()
        this.getTagClass(idea.tag)
      );
      this._ideaListEl.appendChild(card);
    }
    this.addEventListeners();
  }
}

export default IdeaList;
