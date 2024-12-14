import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		setValue(promptValue);
		if (promptValue.length > 2) {
			setError('');
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
		}
	};

	const isValueValid = value.length > 2;

	const formatDate = (date) => date.toLocaleString().replace(',', '');

	const onAddButtonClick = () => {
		if (isValueValid) {
			const id = Date.now();
			// const updatedList = [...list, { id: id, value: value }];
			// setList(updatedList);
			setList((list) => [
				...list,
				{ id: id, value: value, date: formatDate(new Date()) },
			]);
			setError('');
			setValue('');
		}
	};

	const errorBlock = <div className={styles.error}>{error}</div>;

	const listBlock = (
		<ul className={styles.list}>
			{list.map(({ id, value, date }) => (
				<li className={styles.listItem} key={id}>
					{value} ({date})
				</li>
			))}
		</ul>
	);

	const noElementsMsg = (
		<p className={styles.noMarginText}>Нет добавленных элементов</p>
	);

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: &#34;
				<output className={styles.currentValue}>{value}</output>
				&#34;
			</p>
			{error !== '' ? errorBlock : null}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length > 0 ? listBlock : noElementsMsg}
			</div>
		</div>
	);
};
