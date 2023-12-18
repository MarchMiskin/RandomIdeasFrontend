import IdeasApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    this._card = this._ideaListEl.firstElementChild;
    this._ideaListEl.removeChild(this._card);
    while (this._ideaListEl.firstElementChild)
      this._ideaListEl.removeChild(this._ideaListEl.firstElementChild);
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

  getTagClass(tag) {
    tag = tag.toLowerCase();
    return this._validTags.has(tag) ? "tag-" + tag : "tag";
  }

  render() {
    for (let idea of this._ideas) {
      const card = this._card.cloneNode(true);
      card.querySelector("h3").textContent = idea.text;
      //   card.querySelector(".tag").textContent = idea.tag.toUpperCase();
      card.querySelector(".date").textContent = idea.date;
      card.querySelector(".author").textContent = idea.username;
      const tagNode = card.querySelector(".tag");
      tagNode.textContent = idea.tag.toUpperCase();
      tagNode.classList.replace(
        tagNode.classList.item(1),
        // "tag-" + idea.tag.toLowerCase()
        this.getTagClass(idea.tag)
      );
      this._ideaListEl.appendChild(card);
    }
  }
}

export default IdeaList;
