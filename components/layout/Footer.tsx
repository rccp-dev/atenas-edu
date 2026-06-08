export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface">

            <div className="flex justify-center mx-auto max-w-6xl px-6 py-6 text-sm text-foreground">
                © {new Date().getFullYear()} — Atenas Edu
            </div>

        </footer>
    );
}