'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Star } from 'lucide-react';

export function ResultsStep({ data }: any) {
  return (
    <div className="space-y-6">
      
      {/* Success Header */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-green-800">
            🎉 Il Tuo Profilo BLUM è Pronto!
          </CardTitle>
          <CardDescription className="text-green-700">
            Abbiamo analizzato le tue risposte e preparato raccomandazioni personalizzate
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Results Preview */}
      <div className="grid md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🔬 Protocollo Consigliato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-800">
                  Global Rejuvenation Anti-Age
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  Protocollo completo per ringiovanimento naturale del viso
                </p>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Tecnologie:</strong> Radiofrequenza + Ultrasuoni + Veicolazione</p>
                <p><strong>Sedute:</strong> 8 trattamenti ogni 10-15 giorni</p>
                <p><strong>Durata:</strong> 3-4 mesi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📊 Il Tuo Profilo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Nome:</span>
                <span className="text-sm font-medium">
                  {data?.personalData?.nome} {data?.personalData?.cognome}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Email:</span>
                <span className="text-sm font-medium">
                  {data?.personalData?.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completato:</span>
                <span className="text-sm font-medium">
                  {new Date().toLocaleDateString('it-IT')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Scarica Report PDF</span>
        </Button>
        
        <Button variant="outline" className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Prenota Consulenza</span>
        </Button>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Prossimi Passi</CardTitle>
          <CardDescription>
            Come procedere per iniziare il tuo percorso di bellezza
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-green-600">1</span>
              </div>
              <div>
                <h4 className="font-medium">Scarica il tuo Report Personalizzato</h4>
                <p className="text-sm text-gray-600">
                  Il documento contiene tutti i dettagli del protocollo, tempistiche e costi
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-green-600">2</span>
              </div>
              <div>
                <h4 className="font-medium">Prenota la Consulenza Gratuita</h4>
                <p className="text-sm text-gray-600">
                  Incontra la nostra Beauty Specialist per confermare il protocollo
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-green-600">3</span>
              </div>
              <div>
                <h4 className="font-medium">Inizia il Tuo Percorso</h4>
                <p className="text-sm text-gray-600">
                  Primo trattamento con tecnologia Haura e prodotti professionali
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>📧 Riceverai una copia del report via email</p>
        <p>🔒 I tuoi dati sono protetti secondo il GDPR</p>
        <p>💬 Per domande: <a href="mailto:info@blum.it" className="text-green-600 hover:underline">info@blum.it</a></p>
      </div>

    </div>
  );
}
