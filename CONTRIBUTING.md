# Contributing to NuelJay

Thank you for your interest in contributing to NuelJay! 🎉

## Code of Conduct

Please read and adhere to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

1. Use the [issue tracker](https://github.com/legen07/NuelJay/issues).
2. Provide a clear and descriptive title.
3. Include steps to reproduce the behavior.
4. Mention your environment (OS, browser, Node/Bun version).

### Suggesting Features

1. Open an issue with the `enhancement` label.
2. Describe the problem you're trying to solve.
3. Explain how your suggestion addresses it.

### Submitting Code

1. **Fork** the repository.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/NuelJay.git
   cd NuelJay
   ```
3. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes.** Follow these conventions:
   - Use meaningful commit messages (see [Conventional Commits](https://www.conventionalcommits.org/)).
   - Keep PRs focused on a single concern.
   - Add/update tests where applicable.
5. **Test** your changes locally:
   ```bash
   bun install
   bun run dev
   ```
6. **Commit** your changes:
   ```bash
   git commit -m "feat: add new gallery feature"
   ```
7. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** against `main`.

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Formatting (no code change) |
| `refactor` | Code restructuring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks |

Example: `feat(gallery): add lazy loading for images`

## Pull Request Process

1. Ensure any install or build dependencies are installed (`bun install`).
2. Ensure your code follows the project's code style.
3. Update documentation as needed.
4. Your PR will be reviewed by the maintainers.
5. Once approved, it will be merged by a maintainer.

## Environment Setup

- **Package Manager:** Bun (`bun install`)
- **Build Tool:** Gulp (`bun run dev` / `bun run build`)
- **Browser:** Chrome/Edge/Firefox (see `.vscode/launch.json` for debug configs)

---

Thank you for contributing! 🙏
