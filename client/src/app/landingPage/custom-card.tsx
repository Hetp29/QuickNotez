import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React from 'react';

type CardProps = React.ComponentProps<typeof Card>;
type CustomCardProps = CardProps & {
    cardHeder?: React.ReactNode;
    cardContent?: React.ReactNode;
    cardFooter?: React.ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({
    className, 
    cardHeder,
    cardContent,
    cardFooter,
    ...props
}) => {
    return (
        <Card
            className={cn('w-[380px]', className)}
            {...props}
        >
            <CardHeader>(cardHeader)</CardHeader>
            <CardContent
                className="grid
                gap-4
                "
            >
                {cardContent}
            </CardContent>
            <CardFooter>{cardFooter}</CardFooter>

        </Card>
    );
};

export default CustomCard;