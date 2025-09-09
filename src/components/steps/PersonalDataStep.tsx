'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye } from 'lucide-react';

interface PersonalDataStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function PersonalDataStep({ data, onUpdate, onNext }: PersonalDataStepProps) {
  const [formData, setFormData] = React.useState({
    nome: data?.personalData?.nome || '',
    cognome: data?.personalData?.cognome || '',
    email: data?.personalData?.email || '',
    telefono: data?.personalData?.telefono || '',
    consensi: {
      trattamentoDati: data?.personalData?.consensi?.trattamentoDati || false,
      comunicazioniMarketing: data?.personalData?.consensi?.comunicazioniMarketing || false,
      utilizzoFoto: data?.personalData?.consensi?.utilizzoFoto || false,
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ personalData: formData });
    onNext();
  };

  const isValidForm = formData.nome && formData.cognome && formData.email && 
                     formData.telefono && formData.consensi.trattamentoDati;

  return (
    <div className="space-y-6">
      
      {/* Privacy Assurance Header */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Shield className="w-5 h-5" />
            <span>I Tuoi Dati Sono Protetti</span>
          </CardTitle>
          <CardDescription className="text-green-700">
            Utilizziamo crittografia di livello bancario e rispettiamo il GDPR. 
            I tuoi dati non verranno mai condivisi con terze parti senza il tuo consenso esplicito.
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dati Personali */}
        <Card>
          <CardHeader>
            <CardTitle>Informazioni Personali</CardTitle>
            <CardDescription>
              Inserisci i tuoi dati per personalizzare le raccomandazioni
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Il tuo nome"
                  required
                />
              </div>
              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-1">
                  Cognome *
                </label>
                <input
                  id="cognome"
                  type="text"
                  value={formData.cognome}
                  onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Il tuo cognome"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="tua.email@esempio.it"
                required
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Telefono *
              </label>
              <input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+39 123 456 7890"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Consensi Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Consensi Privacy</span>
            </CardTitle>
            <CardDescription>
              Seleziona le autorizzazioni che desideri concederci
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Consenso Obbligatorio */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <input
                id="consent-required"
                type="checkbox"
                checked={formData.consensi.trattamentoDati}
                onChange={(e) => setFormData({
                  ...formData,
                  consensi: { ...formData.consensi, trattamentoDati: e.target.checked }
                })}
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <div>
                <label htmlFor="consent-required" className="text-sm font-medium text-gray-900">
                  Consenso al trattamento dei dati personali (Obbligatorio) *
                </label>
                  <p className="text-xs text-gray-600 mt-1">
                    Autorizzo il trattamento dei miei dati personali ai sensi del GDPR per l&apos;erogazione del servizio di consulenza estetica.
                  </p>
              </div>
            </div>

            {/* Consensi Opzionali */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <input
                  id="consent-marketing"
                  type="checkbox"
                  checked={formData.consensi.comunicazioniMarketing}
                  onChange={(e) => setFormData({
                    ...formData,
                    consensi: { ...formData.consensi, comunicazioniMarketing: e.target.checked }
                  })}
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div>
                  <label htmlFor="consent-marketing" className="text-sm font-medium text-gray-900">
                    Comunicazioni marketing (Opzionale)
                  </label>
                  <p className="text-xs text-gray-600 mt-1">
                    Ricevi consigli di bellezza, offerte esclusive e aggiornamenti sui nostri servizi.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  id="consent-photos"
                  type="checkbox"
                  checked={formData.consensi.utilizzoFoto}
                  onChange={(e) => setFormData({
                    ...formData,
                    consensi: { ...formData.consensi, utilizzoFoto: e.target.checked }
                  })}
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div>
                  <label htmlFor="consent-photos" className="text-sm font-medium text-gray-900">
                    Utilizzo foto anonime (Opzionale)
                  </label>
                  <p className="text-xs text-gray-600 mt-1">
                    <Eye className="w-3 h-3 inline mr-1" />
                    Autorizza l&apos;uso di foto prima/dopo in forma completamente anonima per documentazione scientifica.
                  </p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isValidForm}
            className="bg-green-600 hover:bg-green-700 px-8 py-2"
          >
            Continua →
          </Button>
        </div>
        
      </form>

      {/* Security Notice */}
      <div className="text-center text-xs text-gray-500 mt-6">
        <p>🔒 Connessione sicura SSL • I dati sono crittografati • Conforme GDPR</p>
      </div>
    </div>
  );
}
