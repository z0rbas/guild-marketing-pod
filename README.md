# Guild Marketing Pod Website

A React-based interactive landing page for the Guild of Honour Marketing Pod.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── BootSequence.jsx       # Boot screen animation
│   ├── SalesLetter.jsx        # Main sales letter page
│   ├── Window.jsx             # Draggable window component
│   ├── DockIcon.jsx           # Dock icon component
│   ├── AnimatedCounter.jsx    # Animated number counter
│   ├── FloatingParticles.jsx  # Background particles
│   └── windows/               # Window content components
│       ├── UniversityComparison.jsx
│       ├── ThePath.jsx
│       ├── Curriculum.jsx
│       ├── EarningsSimulator.jsx
│       ├── ProofOfWork.jsx
│       ├── TheCode.jsx
│       ├── MeetTheGuild.jsx
│       └── ApplyNow.jsx
├── App.jsx                    # Main app component
└── main.jsx                   # Entry point
```

## Features

- Boot sequence animation
- Scrollable sales letter
- Interactive desktop OS interface
- Draggable windows
- Multiple content windows with rich interactions

