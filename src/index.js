import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
// import { materialAttr, materialValues } from './data/data';

import './styles.css';

const MOCK_API = 'https://demo3859983.mockable.io/object-data';

// Sorting the values according to the rank
const sortObj = obj =>
	obj.sort((a, b) => {
		return a.rank - b.rank;
	});

class Material extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			attributes: [],
			values: []
		};
	}

	onClickValueHandler = evt => {
		evt.preventDefault();
		const itemObj = JSON.parse(evt.target.dataset.itemType);
		const materialAttr = this.state.attributes;
		const materialValues = this.state.values;
		materialAttr.map(matAttr => {
			if (
				matAttr.id === itemObj.type &&
				matAttr.isActive &&
				!itemObj.isActive
			) {
				matAttr.attributeValues.push({
					id: itemObj.id,
					displayText: itemObj.displayText
				});
				materialValues.map(matValue => {
					if (matValue.id === itemObj.id) {
						matValue.isActive = true;
					}
					return matValue;
				});
			}
			return matAttr;
		});

		this.setState({
			attributes: materialAttr,
			values: sortObj(materialValues)
		});
	};

	onClickAttributeHandler = evt => {
		evt.preventDefault();
		const itemObj = JSON.parse(evt.target.dataset.itemType);
		const materialAttr = this.state.attributes;
		const materialValues = this.state.values;
		materialAttr.map(matAttr => {
			if (matAttr.id === itemObj.id) {
				matAttr.isActive = matAttr.isActive ? false : true;

				materialValues.map(matValue => {
					if (
						matAttr.attributeValues.map(item => item.id).includes(matValue.id)
					) {
						matValue.isActive = true;
					} else {
						matValue.isActive = false;
					}
					return matValue;
				});
			} else {
				matAttr.isActive = false;
			}
			return matAttr;
		});

		this.setState({
			attributes: materialAttr,
			values: sortObj(materialValues)
		});
	};

	componentDidMount() {
		fetch(MOCK_API)
			.then(response => response.json())
			.then(data =>
				this.setState({
					attributes: data.materialAttr,
					values: sortObj(data.materialValues)
				})
			);
	}

	render() {
		return (
			<div className="container mt-5 mb-5">
				<div className="row justify-content-md-center">
					<div className="col col-lg-5">
						<List
							list={this.state.attributes}
							onClickHandler={this.onClickAttributeHandler}
						/>
					</div>
					<div className="col col-lg-3">
						<List
							list={this.state.values}
							onClickHandler={this.onClickValueHandler}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Material />, rootElement);
