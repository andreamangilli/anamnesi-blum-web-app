'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LifestyleStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function LifestyleStep({ onNext }: LifestyleStepProps) {
  return (
    <div className="text-center py-12">
      <Card>
        <CardHeader>
          <CardTitle>🏃‍♀️ Stile di Vita</CardTitle>
          <CardDescription>
            Prossimamente: domande su alimentazione, sonno, sport e abitudini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
            Avanti (Demo)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
