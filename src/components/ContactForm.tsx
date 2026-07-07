"use client";

import type { ReactNode } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/data/band";

export default function ContactForm(): ReactNode {
  return (
    <>
      <p className="text-muted">
        ¿Querés contratarnos para tu evento o local? Envíanos un correo a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand">
          {CONTACT_EMAIL}
        </a>.
      </p>

      <div className="mt-4 text-start" style={{ maxWidth: 500, margin: "0 auto" }}>
        <Form action="https://formspree.io/f/mdarjrbb" method="POST">
          <Form.Group className="mb-3">
            <Form.Label className="glow-sm text-muted">Nombre</Form.Label>
            <Form.Control type="text" name="name" required className="bg-dark text-white border-brand" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="glow-sm text-muted">Email</Form.Label>
            <Form.Control type="email" name="email" required className="bg-dark text-white border-brand" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="glow-sm text-muted">Mensaje</Form.Label>
            <Form.Control as="textarea" name="message" rows={4} required className="bg-dark text-white border-brand" />
          </Form.Group>
          <Button type="submit" variant="outline-light" className="w-100 glow-hover">
            Enviar
          </Button>
        </Form>
      </div>

      <p className="text-muted mt-4">
        o mandanos un mensaje a nuestro{" "}
        <a href={INSTAGRAM_URL} className="text-brand" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>.
      </p>
    </>
  );
}
