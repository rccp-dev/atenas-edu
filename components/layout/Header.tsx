import { User } from "@supabase/supabase-js";

interface Props {
    user: User;
}

export default function Header({ user }: Props) {

    const name = user.user_metadata?.name || user.user_metadata?.email || "Usuário";

    return (
        <header className="border-b border-border bg-surface">

            <div className="flex h-16 items-center justify-end px-8">

                <div className="text-right">

                    <p className="text-sm font-medium text-foreground">
                        {name}
                    </p>

                    <p className="text-xs text-secondary">
                        Ambiente administrativo
                    </p>

                </div>

            </div>

        </header>
    );
}