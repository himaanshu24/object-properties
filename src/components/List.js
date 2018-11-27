import React from 'react';

const List = props => {
	return (
		<div className="list-group">
			{props.list &&
				props.list.map(item => {
					return (
						<a
							key={item.id}
							href="/"
							onClick={props.onClickHandler}
							data-item-type={JSON.stringify(item)}
							className={`list-group-item list-group-item-action ${
								item.isActive ? ' active' : ''
							}
							${
								item.rank === 1
									? ' text-success'
									: item.rank === 2
									? 'text-warning'
									: 'text-danger'
							}
							`}
						>
							{item.attributeValues && item.attributeValues.length
								? `${item.displayText}:  ${item.attributeValues
										.map(item => item.displayText)
										.join(', ')}`
								: item.displayText}
						</a>
					);
				})}
		</div>
	);
};

export default List;
