import { RepositoryItem } from './RepositoryItem';
import '../styles/repositories.scss';
import { useEffect, useState } from 'react';

//https://api.github.com/users/bruno-bergamaschi/repos

export function RepositoryList() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		fetch('https://api.github.com/users/bruno-bergamaschi/repos')
			.then((response) => response.json())
			.then((data) => setRepositories(data));
	}, []);
	// cuidado para não deixar sem o segundo parâmetro
	// entrará em looping

	return (
		<section className='repository-list'>
			<h1>Lista de repositórios</h1>

			<ul>
				{repositories.map((rep) => {
					return <RepositoryItem key={rep.name} repository={rep} />;
				})}
			</ul>
		</section>
	);
}
