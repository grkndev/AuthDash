"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Copy,
  Save,
  Eye,
  EyeOff,
  Check,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { Application, ApplicationStatus } from "@/lib/Application.type";
import dummyData from "@/lib/dummyData";
import AppBadgeStatus from "@/components/apps/AppBadgeStatus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AppPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const router = useRouter();
  const { appId } = use(params);
  const [app, setApp] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    callback_url: "",
    scopes: [] as string[],
  });
  const [showSecret, setShowSecret] = useState(false);
  const [scopeInput, setScopeInput] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Gerçek uygulamada API'den veri çekilecek
    const foundApp = dummyData.find((a) => a.id === appId);
    if (foundApp) {
      setApp(foundApp);
      setFormData({
        name: foundApp.name,
        description: foundApp.description,
        website: foundApp.website,
        callback_url: foundApp.callback_url,
        scopes: foundApp.scopes,
      });
      setScopeInput(foundApp.scopes.join(", "));
    }
  }, [appId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScopeChange = (value: string) => {
    setScopeInput(value);
    const scopesArray = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setFormData((prev) => ({
      ...prev,
      scopes: scopesArray,
    }));
  };

  const handleSubmit = () => {
    // Gerçek uygulamada API'ye gönderilecek
    console.log("Form submitted:", formData);
    alert("Uygulama bilgileri güncellendi!");
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);

    // 2 saniye sonra check icon'unu gizle
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  if (!app) {
    return <div className="p-6">Uygulama bulunamadı.</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className=" p-0 h-auto text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{app.name}</h1>
          </div>
          <Badge variant="outline" className="rounded-lg gap-2 py-1.5">
            <AppBadgeStatus status={app.status} />
            <span className="text-sm font-semibold">{app.status}</span>
          </Badge>
        </div>

        <div className="flex gap-6 text-sm text-muted-foreground">
          <span>Uygulama ID: {app.id}</span>
          <span>Oluşturulma: {app.created_at}</span>
          <span>Son Güncelleme: {app.updated_at}</span>
          <span>Sahibi: {app.author.name}</span>
        </div>
      </div>

      <Separator />

      {/* Side-by-Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column - Application Details */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Uygulama Detayları</CardTitle>
            <CardDescription>
              Uygulamanızın genel bilgilerini düzenleyin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="space-y-2">
              <label className="text-sm font-medium">Uygulama Adı</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Uygulama adını girin"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Website URL</label>
              <Input
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://example.com"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Açıklama</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Uygulama açıklamasını girin"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Callback URL</label>
              <Input
                value={formData.callback_url}
                onChange={(e) =>
                  handleInputChange("callback_url", e.target.value)
                }
                placeholder="https://example.com/callback"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Scopes (virgülle ayırın)
              </label>
              <Input
                value={scopeInput}
                onChange={(e) => handleScopeChange(e.target.value)}
                placeholder="read, write, admin"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.scopes.map((scope, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {scope}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSubmit} className="gap-2 w-full">
                <Save className="h-4 w-4" />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - API Credentials */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>API Kimlik Bilgileri</CardTitle>
              <CardDescription>
                API entegrasyonu için gerekli kimlik bilgileri.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-medium">Client ID</label>
                <div className="flex gap-2">
                  <Input value={app.client_id} readOnly className="bg-muted" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Client ID'yi yeniden oluştur
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Client ID'yi yeniden oluşturmak istediğinize emin
                          misiniz?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction>Yeniden Oluştur</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(app.client_id, "client_id")}
                  >
                    {copiedField === "client_id" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Client Secret</label>
                <div className="flex gap-2">
                  <Input
                    value={showSecret ? app.client_secret : "••••••••••••••••"}
                    readOnly
                    className="bg-muted"
                    type={showSecret ? "text" : "password"}
                  />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Client Secret'yi yeniden oluştur
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Client Secret'yi yeniden oluşturmak istediğinize emin
                          misiniz?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction>Yeniden Oluştur</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(app.client_secret, "client_secret")
                    }
                  >
                    {copiedField === "client_secret" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium">API Kullanım Bilgileri</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>Oluşturulma:</span>
                    <span>{app.created_at}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Son Güncelleme:</span>
                    <span>{app.updated_at}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durum:</span>
                    <Badge variant="outline" className="rounded-lg gap-1 h-5">
                      <AppBadgeStatus status={app.status} />
                      <span className="text-xs">{app.status}</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Uygulama Sahibi</CardTitle>
              <CardDescription>Uygulama sahibinin bilgileri.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={app.author.image} />
                <AvatarFallback>{app.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-medium">{app.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {app.author.email}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/profile/${app.author.id}`)}
              >
                Profili Görüntüle
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
