.PHONY: run dev build clean install

# Development
run:
	npx sst dev

# Clean
clean:
	rm -rf .next
	rm -rf .sst
	rm -rf node_modules

# Install dependencies
install:
	pnpm install

