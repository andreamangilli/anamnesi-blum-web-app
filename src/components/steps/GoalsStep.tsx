'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function GoalsStep({ onNext }: any) {
  return (
    <div className="text-center py-12">
      <Card>
        <CardHeader>
          <CardTitle>🎯 Obiettivi</CardTitle>
          <CardDescription>
            Prossimamente: cosa desideri ottenere, aree critiche, aspettative
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
