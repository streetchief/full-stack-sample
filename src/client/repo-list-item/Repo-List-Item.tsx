import "./repo-list-item.scss"
import { Repo } from "../../repo";

function RepoListItem({ repo }: { repo: Repo }) {
  return (
    <li className="list-group-item repo-list-item">
      <span>{repo.name} </span>
      <a
        href={repo.html_url}
        target="_blank"
        referrerPolicy="no-referrer"
      >link</a>
    </li>
  );
}

export default RepoListItem
