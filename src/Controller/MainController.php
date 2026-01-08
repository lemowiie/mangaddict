<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Repository\MangaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(MangaRepository $mangaRepository): Response
    {
        $latestMangas = $mangaRepository->findBy([], ['id' => 'DESC'], 3);

        return $this->render('main/index.html.twig', [
            'mangas' => $latestMangas,
        ]);
    }


    #[Route('/panier', name: 'app_cart')]
    public function cart(RequestStack $requestStack, MangaRepository $mangaRepository): Response
    {
        $session = $requestStack->getSession();
        $panier = $session->get('panier', []);

        $panierWithData = [];
        $total = 0;

        foreach ($panier as $id => $quantity) {
            $manga = $mangaRepository->find($id);
            if ($manga) {
                $panierWithData[] = [
                    'manga' => $manga,
                    'quantity' => $quantity
                ];
                $total += $manga->getPrice() * $quantity;
            }
        }

        return $this->render('main/cart.html.twig', [
            'items' => $panierWithData,
            'total' => $total
        ]);
    }

    #[Route('/panier/add/{id}', name: 'app_cart_add')]
    public function add($id, RequestStack $requestStack): Response
    {
        $session = $requestStack->getSession();
        $panier = $session->get('panier', []);

        if (!empty($panier[$id])) {
            $panier[$id]++;
        } else {
            $panier[$id] = 1;
        }

        $session->set('panier', $panier);

 
        $this->addFlash('success', 'Produit ajouté au panier !');

        return $this->redirectToRoute('app_cart'); 
    }

    #[Route('/panier/remove/{id}', name: 'app_cart_remove')]
    public function remove($id, RequestStack $requestStack): Response
    {
        $session = $requestStack->getSession();
        $panier = $session->get('panier', []);

        if (!empty($panier[$id])) {
            unset($panier[$id]);
        }

        $session->set('panier', $panier);

        return $this->redirectToRoute('app_cart');
    }

    #[Route('/panier/validate', name: 'app_cart_validate')]
    #[IsGranted('ROLE_USER')] 
    public function validate(RequestStack $requestStack, MangaRepository $mangaRepository, EntityManagerInterface $em): Response
    {
        $session = $requestStack->getSession();
        $panier = $session->get('panier', []);

        if (empty($panier)) {
            $this->addFlash('warning', 'Votre panier est vide.');
            return $this->redirectToRoute('app_manga_index');
        }

        $total = 0;
        $resumeContenu = "";
        
        foreach ($panier as $id => $quantity) {
            $manga = $mangaRepository->find($id);
            if ($manga) {
                $total += $manga->getPrice() * $quantity;
                $resumeContenu .= $quantity . 'x ' . $manga->getTitle() . ' | ';
            }
        }

        $commande = new Commande();
        $commande->setUser($this->getUser()); 
        $commande->setTotal($total);
        $commande->setContenu($resumeContenu);
        $commande->setCreatedAt(new \DateTime());

        $em->persist($commande);
        $em->flush();

        $session->remove('panier');

        $this->addFlash('success', 'Votre commande a été validée et enregistrée avec succès !');
        
        return $this->redirectToRoute('app_home');
    }



    #[Route('/mentions-legales', name: 'app_legal')]
    public function legal(): Response
    {
        return $this->render('main/legal.html.twig');
    }

    #[Route('/cgu', name: 'app_cgu')]
    public function cgu(): Response
    {
        return $this->render('main/cgu.html.twig');
    }
    
    #[Route('/privacy', name: 'app_privacy')]
    public function privacy(): Response
    {
        return $this->render('main/privacy.html.twig');
    }

    #[Route('/about', name: 'app_about')]
    public function about(): Response
    {
        return $this->render('main/about.html.twig');
    }

    #[Route('/contact', name: 'app_contact')]
    public function contact(Request $request): Response
    {
        return $this->render('main/contact.html.twig');
    }
}