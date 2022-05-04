<?php

namespace App\DataFixtures;

use App\Entity\Annonce;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class AnnonceFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('fr_FR');
        for($i=0; $i <= 5; $i++){
            $categorie=$this->getReference('categorie_'.$faker->numberBetween(0,5));
            $annonce = new Annonce();
            $annonce->setNomProduit($faker->word);
            $annonce->setDescription($faker->sentence);
            $annonce->setPrix($faker->numberBetween(1,1000));
            $annonce->setCategorie($categorie);
            $manager->persist($annonce);
        }
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategorieFixture::class
        ];
    }
}
