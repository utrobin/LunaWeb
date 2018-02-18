// import React from 'react';
// import GraphiQL from 'graphiql';
// import fetch from 'isomorphic-fetch';
//
// function takeGetParams(url: string = window.location.href): any {
// 	url = url.substring(url.indexOf('?'));
//
// 	return url
// 		.replace('?', '')
// 		.split('&')
// 		.reduce(
// 			(prev, el) => {
// 				const a = el.split('=');
// 				prev[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
// 				return prev;
// 			},
// 			{},
// 		);
// }
//
//
// function graphQLFetcher(graphQLParams) {
// 	const getParametrs = takeGetParams();
// 	const url = getParametrs.host || 'https://utrobin.com/api/graphql';
//
// 	return fetch(url, {
// 		method: 'post',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(graphQLParams),
// 	}).then(response => response.json());
// }
//
// const style = {
// 	height: '100vh',
// 	width: '100vw',
// 	margin: 0,
// 	overflow: 'hidden',
// 	position: 'fixed',
// 	left: 0,
// 	top: 0,
// 	zIndex: 9999,
// }
//
// export default () => <div style={style}>
// 	<GraphiQL fetcher={graphQLFetcher} />
// </div>;