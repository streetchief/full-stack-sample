import "./App.scss";

import { useState } from "react";
import RepoListItem from "./repo-list-item/Repo-List-Item";
import { Repo } from "../repo";

const urls = {
  org: "gh/org/repos",
  user: "gh/user/repos"
} as const;

function App() {
  const [name, setName] = useState("");
  const [repos, setRepos] = useState([] as Repo[]);
  const [searching, setSearching] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    setSearching(true)
    const searchTarget = event.nativeEvent.submitter?.dataset.search;

    // Check button data-search property for valid targets
    if (searchTarget !== "org" && searchTarget !== "user") {
      console.error('Bad search target', searchTarget);
      return;
    }

    const route = urls[searchTarget];
    const url = `${document.URL}${route}?name=${name}`;

    try {
      const res = await fetch(url)

      if (res.status > 399) {
        throw new Error("Response failed");
      }

      const repos = await res.json();
      setRepos(repos);
    } catch (error) {
      console.error(error)
      setRepos([])
    } finally {
      setSearching(false)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value ?? "");
  }

  const repoList = repos.length > 0
    ? repos.map(repo => <RepoListItem key={repo.id} repo={repo}></RepoListItem>)
    : undefined

  return (
    <div className="container py-4 px-3 mx-auto text-center">
      <h1>Full-stack Sample</h1>
      <form onSubmit={handleSubmit}>
        <h2>
          <label htmlFor="name-input form-label">
            Enter a Github Organization or User to Search for Repositories:
          </label>
        </h2>
        <input
          autoComplete="off"
          className="form-control w-50 mx-auto"
          id="name-input"
          name="name"
          onChange={handleChange}
          required
          type="text"
          placeholder="name"
          value={name}
        />
        <button
          type="submit"
          className="btn btn-primary"
          data-search="org"
          disabled={searching}
        >
          Organization
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          data-search="user"
          disabled={searching}
        >
          User
        </button>
      </form>
      <h2 id="repo-list-heading">Results</h2>
      <ul
        aria-labelledby="repo-list-heading"
        className="list-group list-group-numbered"
        role="list"
      >
        {repoList}
      </ul>
    </div>
  );
}

export default App;
