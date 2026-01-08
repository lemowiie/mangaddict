<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class MangaWeb extends WebTestCase
{
    public function testVisiteMangaAddict(): void
    {
        $client = static::createClient();
        
        $crawler = $client->request('GET', '/');

        $this->assertResponseIsSuccessful();

        $this->assertSelectorTextContains('h1', 'MangaAddict');
    }

    public function testConnexionScenario(): void
    {
        $client = static::createClient();
        
        $crawler = $client->request('GET', '/login');

        $this->assertResponseIsSuccessful();

        $client->submitForm('Se connecter', [
            'email' => 'admin@mangaaddict.fr',
            'password' => 'password123',
        ]);
    }
}