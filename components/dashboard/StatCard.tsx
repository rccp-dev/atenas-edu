import { LucideIcon } from "lucide-react";

import Card from "@/components/ui/Card";

interface Props {
    label: string;
    value: number;
    icon: LucideIcon;
}

export default function StatCard({
    label,
    value,
    icon: Icon,
}: Props) {
    return (
        <Card>

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-secondary">
                        {label}
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-primary">
                        {value}
                    </h3>

                </div>

                <div className="rounded-xl bg-background p-3">
                    <Icon size={22} strokeWidth={1.8} className="text-primary"/>
                </div>
                
            </div>
        </Card>
    );
}