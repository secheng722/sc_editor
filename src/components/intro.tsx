import { Github } from "lucide-react";

export default function Introduction() {
  return (
    <div className="flex flex-col w-full items-center justify-center space-y-2 px-16 py-6">
      <h1 className="font-heading  text-5xl text-foreground">ScEditor</h1>
      <p className="text-lg text-muted-foreground">A simple note taking app</p>
      <p className="text-sm text-muted-foreground/80">
        Built with Rust & Tauri
      </p>
      <a
        href="https://github.com/secheng722"
        target="_blank"
        className="text-sm text-muted-foreground/80 "
      >
        <div className="flex items-center">
          <Github size={16} />
          <p className="text-sm text-muted-foreground/80 ml-2">secheng722</p>
        </div>
      </a>
    </div>
  );
}
