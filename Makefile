install:
		npm ci
lint:
		npx eslint .
publish:
		npm publish --dry-run
jest:
		NODE_OPTIONS=--experimental-vm-modules npx jest
fix:
		npx eslint --fix .