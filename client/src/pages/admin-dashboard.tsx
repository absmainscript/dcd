import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, MessageSquare, HelpCircle, Briefcase, Users, Eye, EyeOff, Edit, Trash2, Plus, LogOut, Home, Palette, Star, GripVertical, Upload, Camera, Image, TrendingUp, Globe, Search, Ban, Target, Brain, Heart, BookOpen, Award, Shield, Sun, Moon, Sparkles, Handshake, MessageCircle, Leaf, Flower, Compass, ChevronUp, ChevronDown, TreePine, Wind, Umbrella, LifeBuoy, Puzzle, Waves, Mountain, Timer, Clock, Activity, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HeroColorSettings } from "@/components/admin/HeroColorSettings";
import { SectionColorManager } from "@/components/admin/SectionColorManager";
import type { SiteConfig, Testimonial, FaqItem, Service, PhotoCarousel, Specialty } from "@shared/schema";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Imports dos componentes que existem
import { HeroImageUpload } from "@/components/admin/HeroImageUpload";
import { TestimonialImageUpload } from "@/components/admin/TestimonialImageUpload";
import { PhotoCarouselImageUpload } from "@/components/admin/PhotoCarouselImageUpload";
import { BasicInfoForm } from "@/components/admin/BasicInfoForm";
import { NavigationForm } from "@/components/admin/NavigationForm";
import { HeroSectionForm } from "@/components/admin/HeroSectionForm";
import { AboutSectionTextsForm } from "@/components/admin/AboutSectionTextsForm";
import { AboutCredentialsManager } from "@/components/admin/AboutCredentialsManager";
import { PhotoCarouselTextsForm } from "@/components/admin/PhotoCarouselTextsForm";
import { PhotoCarouselManager } from "@/components/admin/PhotoCarouselManager";
import { InspirationalSectionForm } from "@/components/admin/InspirationalSectionForm";
import { TestimonialsSectionTextsForm } from "@/components/admin/TestimonialsSectionTextsForm";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { ServicesSectionTextsForm } from "@/components/admin/ServicesSectionTextsForm";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { FaqSectionTextsForm } from "@/components/admin/FaqSectionTextsForm";
import { FaqManager } from "@/components/admin/FaqManager";
import { SchedulingCardForm } from "@/components/admin/SchedulingCardForm";
import { ContactScheduleManager } from "@/components/admin/ContactScheduleManager";
import { FooterManager } from "@/components/admin/FooterManager";
import { SectionVisibilitySettings } from "@/components/admin/SectionVisibilitySettings";
import { MarketingSettings } from "@/components/admin/MarketingSettings";
import { AppearanceSettings } from "@/components/admin/AppearanceSettings";
import { MaintenanceForm } from "@/components/admin/MaintenanceForm";
import { SpecialtiesManager } from "@/components/admin/SpecialtiesManager";
import { SpecialtiesSectionTextsForm } from "@/components/admin/SpecialtiesSectionTextsForm";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [activeTab, setActiveTab] = useState("general");




  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      setLocation("/09806446909");
    }
  }, [setLocation]);

  const logout = () => {
    localStorage.removeItem("admin_logged_in");
    setLocation("/09806446909");
  };

  // Queries
  const { data: siteConfigs = [] } = useQuery<SiteConfig[]>({
    queryKey: ["/api/admin/config"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/config");
      return response.json();
    },
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/testimonials");
      return response.json();
    },
  });

  const { data: faqItems = [] } = useQuery<FaqItem[]>({
    queryKey: ["/api/admin/faq"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/faq");
      return response.json();
    },
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/services");
      return response.json();
    },
  });

  const { data: photoCarousel = [] } = useQuery<PhotoCarousel[]>({
    queryKey: ["/api/admin/photo-carousel"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/photo-carousel");
      return response.json();
    },
  });

  const { data: specialties = [] } = useQuery<Specialty[]>({
    queryKey: ["/api/admin/specialties"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/specialties");
      return response.json();
    },
  });

  const { data: contactSettings } = useQuery({
    queryKey: ["/api/admin/contact-settings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/contact-settings");
      return response.json();
    },
  });

  const { data: footerSettings } = useQuery({
    queryKey: ["/api/admin/footer-settings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/footer-settings");
      return response.json();
    },
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Painel Admin
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Dra. Adrielle Benhossi
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Home className="w-4 h-4 mr-2" />
                  Ver Site
                </Button>
                <Button variant="outline" size="sm" className="sm:hidden">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
              <Button onClick={logout} variant="destructive" size="sm" className="hidden sm:flex">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <Button onClick={logout} variant="destructive" size="sm" className="sm:hidden">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Welcome Banner */}
        {showWelcomeBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <div 
              className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-3 sm:p-4 relative touch-pan-x cursor-pointer select-none"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                e.currentTarget.dataset.startX = touch.clientX.toString();
                e.currentTarget.dataset.startY = touch.clientY.toString();
              }}
              onTouchMove={(e) => {
                const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                const startY = parseFloat(e.currentTarget.dataset.startY || '0');
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                // Só processar swipe horizontal se for maior que vertical
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                  e.currentTarget.style.transform = `translateX(${deltaX}px)`;
                  e.currentTarget.style.opacity = Math.max(0.3, 1 - Math.abs(deltaX) / 200).toString();
                }
              }}
              onTouchEnd={(e) => {
                const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                const startY = parseFloat(e.currentTarget.dataset.startY || '0');
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const deltaX = endX - startX;
                const deltaY = endY - startY;

                // Reset transform primeiro
                e.currentTarget.style.transform = '';
                e.currentTarget.style.opacity = '';

                // Se swipe horizontal for significativo (mais de 80px) e maior que vertical, fechar
                if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY)) {
                  setShowWelcomeBanner(false);
                }
              }}
            >
              <button
                onClick={() => setShowWelcomeBanner(false)}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-600 hover:text-gray-800 transition-colors text-xl sm:text-lg font-bold bg-white/70 hover:bg-white/90 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow-sm border border-gray-200"
                aria-label="Fechar notificação"
              >
                ×
              </button>
              <div className="pr-8 sm:pr-10">
                <h3 className="font-semibold text-purple-900 mb-1 sm:mb-2 text-sm sm:text-base">
                  👋 Bem-vinda, Leleli!
                </h3>
                <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">
                  Aqui você personaliza tudo do seu site! Mexe nos textos, cores, suas fotos, depoimentos dos pacientes, 
                  seus serviços, FAQ e configura os pixels pro Facebook e Google. Toda mudança já fica no ar na hora!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Navegação Unificada - Select Dropdown para Mobile e Desktop */}
            <div className="w-full">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full bg-white border-gray-300 hover:border-purple-400 transition-colors">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {activeTab === "general" && "📋"}
                        {activeTab === "about" && "👩‍⚕️"}
                        {activeTab === "gallery" && "📸"}
                        {activeTab === "specialties" && "🎯"}
                        {activeTab === "inspirational" && "💭"}
                        {activeTab === "testimonials" && "💬"}
                        {activeTab === "services" && "🔧"}
                        {activeTab === "faq" && "❓"}
                        {activeTab === "contact-schedule" && "📞"}
                        {activeTab === "footer" && "🦶"}
                        {activeTab === "visibility" && "👁️"}
                        {activeTab === "marketing" && "📊"}
                        {activeTab === "appearance" && "🎨"}
                      </span>
                      <span className="font-medium">
                        {activeTab === "general" && "Configurações Gerais"}
                        {activeTab === "about" && "Gerenciar Sobre"}
                        {activeTab === "gallery" && "Galeria de Fotos"}
                        {activeTab === "specialties" && "Minhas Especialidades"}
                        {activeTab === "inspirational" && "Citação Inspiracional"}
                        {activeTab === "testimonials" && "Gerenciar Depoimentos"}
                        {activeTab === "services" && "Gerenciar Serviços"}
                        {activeTab === "faq" && "Gerenciar FAQ"}
                        {activeTab === "contact-schedule" && "Contato e Horários"}
                        {activeTab === "footer" && "Gerenciar Rodapé"}
                        {activeTab === "visibility" && "Controlar Visibilidade"}
                        {activeTab === "marketing" && "Pixels de Marketing"}
                        {activeTab === "appearance" && "Personalizar Cores"}
                      </span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Configurações do Site
                    </div>
                    <SelectItem value="general" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📋</span>
                        <div>
                          <div className="font-medium">Configurações Gerais</div>
                          <div className="text-xs text-gray-500">Informações básicas, textos e foto</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="about" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">👩‍⚕️</span>
                        <div>
                          <div className="font-medium">Gerenciar Sobre</div>
                          <div className="text-xs text-gray-500">Credenciais e qualificações</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="gallery" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📸</span>
                        <div>
                          <div className="font-medium">Galeria de Fotos</div>
                          <div className="text-xs text-gray-500">Carrossel do consultório</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="specialties" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎯</span>
                        <div>
                          <div className="font-medium">Minhas Especialidades</div>
                          <div className="text-xs text-gray-500">Áreas de atuação</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="inspirational" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">💭</span>
                        <div>
                          <div className="font-medium">Citação Inspiracional</div>
                          <div className="text-xs text-gray-500">Frase motivacional</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>

                  <div className="p-2 border-t">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Conteúdo
                    </div>
                    <SelectItem value="testimonials" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">💬</span>
                        <div>
                          <div className="font-medium">Gerenciar Depoimentos</div>
                          <div className="text-xs text-gray-500">Avaliações de pacientes</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="services" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🔧</span>
                        <div>
                          <div className="font-medium">Gerenciar Serviços</div>
                          <div className="text-xs text-gray-500">Tipos de atendimento e preços</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="faq" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">❓</span>
                        <div>
                          <div className="font-medium">Gerenciar FAQ</div>
                          <div className="text-xs text-gray-500">Perguntas frequentes</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>

                  <div className="p-2 border-t">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Contato e Layout
                    </div>
                    <SelectItem value="contact-schedule" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📞</span>
                        <div>
                          <div className="font-medium">Contato e Horários</div>
                          <div className="text-xs text-gray-500">Botões e informações de contato</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="footer" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🦶</span>
                        <div>
                          <div className="font-medium">Gerenciar Rodapé</div>
                          <div className="text-xs text-gray-500">Links e informações finais</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>

                  <div className="p-2 border-t">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Configurações Avançadas
                    </div>
                    <SelectItem value="visibility" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">👁️</span>
                        <div>
                          <div className="font-medium">Controlar Visibilidade</div>
                          <div className="text-xs text-gray-500">Mostrar/ocultar seções</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="marketing" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📊</span>
                        <div>
                          <div className="font-medium">Pixels de Marketing</div>
                          <div className="text-xs text-gray-500">Facebook, Google Analytics</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="appearance" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎨</span>
                        <div>
                          <div className="font-medium">Personalizar Cores</div>
                          <div className="text-xs text-gray-500">Temas e paletas de cores</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>
              <div className="grid gap-6">
                {/* Informações Básicas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">👤</span>
                      Informações Básicas
                    </CardTitle>
                    <CardDescription>
                      Configure os dados principais: nome, CRP, descrição e foto de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BasicInfoForm configs={siteConfigs} />
                  </CardContent>
                </Card>

                {/* Seção Hero */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">🏠</span>
                      Seção Principal (Hero)
                    </CardTitle>
                    <CardDescription>
                      Configure a primeira seção que os visitantes veem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HeroSectionForm configs={siteConfigs} />
                  </CardContent>
                </Card>

                {/* Navegação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">🧭</span>
                      Menu de Navegação
                    </CardTitle>
                    <CardDescription>
                      Personalize os nomes dos botões do menu (apenas os nomes, as funcionalidades permanecem)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NavigationForm configs={siteConfigs} />
                  </CardContent>
                </Card>

                {/* Modo Manutenção */}
                <Card className="border-orange-200 bg-orange-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <span className="text-lg">🚧</span>
                      Modo de Manutenção
                    </CardTitle>
                    <CardDescription className="text-orange-700">
                      Controle se o site fica público ou em manutenção
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MaintenanceForm configs={siteConfigs} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção Sobre */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Sobre
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção sobre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AboutSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Credenciais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">🎓</span>
                    Gerenciar Credenciais
                  </CardTitle>
                  <CardDescription>
                    Configure as credenciais, qualificações e especializações exibidas na seção "Sobre". 
                    Cada item aparece como um card com gradiente personalizado na seção sobre a psicóloga.
                    Arraste e solte para reordenar a sequência de exibição.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AboutCredentialsManager configs={siteConfigs} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              {/* Configurações de Texto da Galeria */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Galeria
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da galeria de fotos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhotoCarouselTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Fotos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📸</span>
                    Gerenciar Fotos do Carrossel
                  </CardTitle>
                  <CardDescription>
                    Adicione, edite e organize as fotos do consultório. O carrossel avança automaticamente a cada 6 segundos.
                    Arraste e solte para reordenar as fotos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhotoCarouselManager photoCarousel={photoCarousel} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Specialties Tab */}
            <TabsContent value="specialties" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção Especialidades */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Especialidades
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção de especialidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SpecialtiesSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Especialidades */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    Gerenciar Minhas Especialidades
                  </CardTitle>
                  <CardDescription>
                    Configure suas áreas de especialização que aparecem na seção "Sobre". 
                    Defina título, descrição, ícone e cor para cada especialidade.
                    Arraste e solte para reordenar por prioridade.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SpecialtiesManager specialties={specialties} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inspirational Tab */}
            <TabsContent value="inspirational" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">💭</span>
                    Citação Inspiracional
                  </CardTitle>
                  <CardDescription>
                    Configure a frase motivacional que aparece na seção inspiracional do seu site
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InspirationalSectionForm configs={siteConfigs} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção Depoimentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Depoimentos
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção de depoimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TestimonialsSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Depoimentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    Gerenciar Depoimentos
                  </CardTitle>
                  <CardDescription>
                    Aqui você adiciona, edita ou remove depoimentos dos seus pacientes. 
                    Use avatares variados para representar diferentes perfis de clientes. 
                    Arraste e solte para reordenar a sequência de exibição no site.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TestimonialsManager testimonials={testimonials} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Serviços
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção de serviços
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServicesSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">🔧</span>
                    Gerenciar Serviços
                  </CardTitle>
                  <CardDescription>
                    Configure os serviços que você oferece: título, descrição, ícone e preços. 
                    Escolha entre 40+ ícones profissionais organizados por categorias. 
                    Ative/desative serviços e reordene usando arrastar e soltar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServicesManager services={services} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção FAQ
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção de FAQ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FaqSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">❓</span>
                    Gerenciar FAQ
                  </CardTitle>
                  <CardDescription>
                    Crie perguntas e respostas frequentes sobre seus serviços. 
                    Ajude seus futuros pacientes esclarecendo dúvidas comuns. 
                    Organize as perguntas arrastando para reordenar por importância.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FaqManager faqItems={faqItems} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visibility Tab */}
            <TabsContent value="visibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visibilidade das Seções</CardTitle>
                  <CardDescription>
                    Controle quais seções do site estão visíveis para os visitantes. 
                    Você pode temporariamente desativar seções durante atualizações ou manutenção.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SectionVisibilitySettings configs={siteConfigs} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Marketing Tab */}
            <TabsContent value="marketing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Marketing</CardTitle>
                  <CardDescription>
                    Configure códigos de acompanhamento para medir visitas e resultados. 
                    Google Analytics mostra estatísticas detalhadas. Facebook Pixel permite criar anúncios direcionados. 
                    Cole os códigos fornecidos por essas plataformas aqui.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketingSettings configs={siteConfigs} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Schedule Tab */}
            <TabsContent value="contact-schedule" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
                <p className="text-sm text-blue-600">
                  <strong>Exemplos de uso:</strong> Atendimento online? Desative a localização. Horários flexíveis? Desative os horários. Apenas contato por mensagem? Mantenha apenas o card de contato ativo.
                </p>
              </div>

              {/* Configurações do Card de Agendamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Card de Agendamento
                  </CardTitle>
                  <CardDescription>
                    Configure os textos do card "Vamos conversar?" que aparece na seção de contato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SchedulingCardForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Contato */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    Gerenciar Botões e Horários
                  </CardTitle>
                  <CardDescription>
                    Configure botões de contato, horários de funcionamento e localização. 
                    Personalize botões de contato, reordene por prioridade e defina links personalizados.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactScheduleManager contactSettings={contactSettings} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Footer Tab */}
            <TabsContent value="footer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Rodapé</CardTitle>
                  <CardDescription>
                    Configure todos os elementos do rodapé: textos, botões de contato, certificações, 
                    selos de confiança, informações de copyright e CNPJ. Personalize cores, ícones e ordenação.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FooterManager footerSettings={footerSettings} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="grid gap-6">
                {/* Gerenciador de Cores por Seção */}
                <SectionColorManager configs={siteConfigs} />

                {/* Configurações Globais de Aparência */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cores Globais do Sistema</CardTitle>
                    <CardDescription>
                      Configure as cores principais que afetam botões, links e elementos interativos em todo o site
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AppearanceSettings configs={siteConfigs} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-center text-xs text-gray-400">
            Made with <span className="text-yellow-500">♥</span> by <span className="font-mono">∞</span>
          </div>
        </div>
      </div>
    </div>
  );
}