install:
		npm ci
lint:
		npx eslint .
publish:
		npm publish --dry-run
jest:
		NODE_OPTIONS=--experimental-vm-modules npx jest
cover:
		NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
fix:
		npx eslint --fix .