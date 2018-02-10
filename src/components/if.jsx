import React from 'react';

export default function If({condition, children}) {
	if (condition) {
		return children;
	} else {
		return null;
	}
}